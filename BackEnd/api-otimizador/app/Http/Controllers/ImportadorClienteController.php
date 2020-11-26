<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Imports\DuplicataReceberImport;
use App\Exports\ClientesContabilidade;
use App\Models\DuplicataReceber;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ResultClientesComErro;
use App\Models\Layouts\LayoutRecebimento;

class ImportadorClienteController extends Controller
{
    private $path = "arquivos/clientes/";
    private $nomeArquivoCliente = "cliente";
    private $nomeArquivoEscritorio = "cliente_escritorio";
    private $pathBase;

    public function __construct()
    {
        $this->pathBase  = storage_path() . "/app/";
    }

    public function carregarArquivo(Request $request, $idEmpresa = null, $idLayoutRecebimento = null) {
        try {
            if($request->hasFile("arquivo_cliente")) {
                if($request->arquivo_cliente->isValid() && $idEmpresa != null ){
                    $name = $this->nomeArquivoCliente . "." . $request->arquivo_cliente->clientExtension();
                    $request->arquivo_cliente->storeAs("$this->path/$idEmpresa/", $name);
                    $result = $this->lerArquivoCliente($idEmpresa, $idLayoutRecebimento);
                } else {
                    return response()->json(["msg" => "Arquivo inválido!"], 500);
                }
            } else if($request->hasFile("arquivo_escritorio")){
                if($request->arquivo_escritorio->isValid() && $idEmpresa != null ) {
                    $name = $this->nomeArquivoEscritorio . "." . $request->arquivo_escritorio->clientExtension();
                    $request->arquivo_escritorio->storeAs("$this->path/$idEmpresa/", $name);
                    $result = "";
                } else {
                    return response()->json(["msg" => "Arquivo inválido!"], 500);
                }
            } else {
                return response()->json(["msg" => "Arquivo não encontrado!"], 500);
            }

            return response()->json(["msg" => $result], 200);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), 500);
        }
    }

    public function lerArquivoCliente($idEmpresa, $idLayoutRecebimento) {
        try {
            $duplicatas = DuplicataReceber::where("empresa_id", $idEmpresa)->delete();
            activity()->disableLogging();
            Excel::import(new DuplicataReceberImport($idEmpresa, $idLayoutRecebimento), storage_path("app/arquivos/clientes/$idEmpresa/$this->nomeArquivoCliente.xls", null, \Maatwebsite\Excel\Excel::XLS));
            activity()->enableLogging();
            return "";
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }
    }

    public function lerArquivoClienteEscritorio($idEmpresa) {
        try {
            $array = Excel::toArray(null, storage_path("app/arquivos/clientes/$idEmpresa/$this->nomeArquivoEscritorio.xls"));
            return $array;
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }
    }

    public function confrontar($idEmpresa) {
        $result = $this->lerArquivoClienteEscritorio($idEmpresa);
        $linha = [];
        $linhaComErro = [];
        $dados = [];
        $duplicatas = DuplicataReceber::select("cnpj", "nome_cliente")->distinct()->get();
        foreach ($duplicatas as $key => $value){
            $cnpj = $value["cnpj"];
            $dado = null;
            // return $result;
            if($result[0]) {
                foreach($result[0] as $k => $v) {
                    $dado = array_search($cnpj, $v);
                    if($dado){
                        break;
                    }
                }
            }
            if(!$dado) {
                array_push($linhaComErro, [$value['nome_cliente'], $value['cnpj']]);
            }
        }

        $exportComErro = new ResultClientesComErro($linhaComErro);
        Excel::store($exportComErro, "arquivos/clientes/$idEmpresa/clientesComErro.xls", 'local', \Maatwebsite\Excel\Excel::XLS);
        Excel::store($exportComErro, "arquivos/clientes/$idEmpresa/clientesComErro.pdf", 'local', \Maatwebsite\Excel\Excel::DOMPDF);
        $array[] = $linha;
        $array[] = $linhaComErro;
        return  $array;
    }

    public function baixarArquivoClientesComErro($idEmpresa, $extensao) {
        $array = Excel::toArray(null, storage_path("app/arquivos/clientes/$idEmpresa/clientesComErro.xls"));
        unset($array[0][0]);
        return
        $extensao == 'xls'
        ? Excel::download(new ResultClientesComErro($array), 'clientes-com-erro.xls', \Maatwebsite\Excel\Excel::XLS, ['Content-Type' => 'text/xls'])
        : Excel::download(new ResultClientesComErro($array), 'clientes-com-erro.pdf', \Maatwebsite\Excel\Excel::DOMPDF, ['Content-Type' => 'application/pdf']);
    }

    public function gerarArquivoContabilidade($idEmpresa) {
        try {

            $result = $this->lerArquivoClienteEscritorio($idEmpresa);
            $linha = [];
            array_shift($result[0]);
            $duplicatas = DuplicataReceber::select("data", "total_pago", "cnpj", "nome_cliente", "numero_nota_fiscal", "banco", "cod_cliente")->where("empresa_id", $idEmpresa)->get();
            $idAtual = "";
            foreach ($duplicatas as $key => $value){
                $idTrn = $value["cod_cliente"];
                foreach ($result[0] as $k) {
                    $cnpj = $value["cnpj"];
                    if($cnpj == $k[10]){
                        $data1 = strtotime($value["data"]);
                        $data = date("d/m/Y", $data1);
                        $contacredito = $k[2];
                        $contadebito = strstr($value["banco"], "01601") != null ? 50 : (strstr($value["banco"], "35255") != null ? 51 : (strstr($value["banco"], "86550") != null ? 52 : 53));
                        $valor = number_format($value["total_pago"], 2, ",", ".");
                        $historico = "RECEBIMENTO " . $value["numero_nota_fiscal"] . "  " . $k[5];
                        $lote = 1;
                        $idAtual = $idTrn;
                        array_push($linha, [$data, $contadebito, $contacredito, $valor, $historico, $lote]);
                        break;
                    }
                }
            }
            // unlink(storage_path("app/arquivos/fornecedores/$idEmpresa/fornecedoresContabilidade.xls"));
            $export = new ClientesContabilidade($linha);
            Excel::store($export, "arquivos/clientes/$idEmpresa/clientesContabilidade.xls", 'local', \Maatwebsite\Excel\Excel::XLS);
            Excel::store($export , "arquivos/clientes/$idEmpresa/clientesContabilidade.pdf", 'local', \Maatwebsite\Excel\Excel::DOMPDF);
            return response()->json($linha, 200);
        } catch (\Exception $ex) {
            return response()->json(["error" => $ex->getMessage()], 500);
        }
    }

    public function baixarArquivoClientesContabilidade($idEmpresa, $extensao) {
        try {

            $array = Excel::toArray(null, storage_path("app/arquivos/clientes/$idEmpresa/clientesContabilidade.xls"));
            unset($array[0][0]);
            return
            $extensao == 'csv'
            ? Excel::download(new ClientesContabilidade($array), 'clientesContabilidade-ok-$idEmpresa.csv', \Maatwebsite\Excel\Excel::CSV,
            ['Content-Type' => 'text/csv'])
            : Excel::download(new ClientesContabilidade($array), 'clientesContabilidade-ok-$idEmpresa.pdf', \Maatwebsite\Excel\Excel::DOMPDF,
            ['Content-Type' => 'application/pdf']);
        } catch (\Exception $ex) {
            return response()->json(["error" => $ex->getMessage()], 500);
        }
    }
}
