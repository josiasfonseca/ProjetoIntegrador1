<?php

namespace App\Http\Controllers;

use App\Exports\ResultFornecedoresComErro;
use App\Exports\ResultFornecedoresOk;
use App\Imports\DuplicataPagarImport;
use App\Models\DuplicataPagar;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Dompdf\Dompdf;

class ImportadorFornecedorController extends Controller
{
    private $path = "arquivos/fornecedores/";
    private $nomeArquivoFornecedor = "fornecedor";
    private $nomeArquivoFornecedorEscritorio = "fornecedor_escritorio";
    private $pathBase;

    public function __construct()
    {
        $this->pathBase  = storage_path() . "/app/";
    }

    public function carregarArquivo(Request $request, $idEmpresa = null) {
        try {
            if($request->hasFile("arquivo_fornecedor")) {
                if($request->arquivo_fornecedor->isValid() && $idEmpresa != null ){
                    $name = $this->nomeArquivoFornecedor . "." . $request->arquivo_fornecedor->clientExtension();
                    $request->arquivo_fornecedor->storeAs("$this->path/$idEmpresa/", $name);
                    $result = $this->lerArquivoFornecedor($idEmpresa);
                } else {
                    return response()->json(["msg" => "Arquivo inválido!"], 500);
                }
            } else if($request->hasFile("arquivo_fornecedor_escritorio")){
                if($request->arquivo_fornecedor_escritorio->isValid() && $idEmpresa != null ) {
                    $name = $this->nomeArquivoFornecedorEscritorio . "." . $request->arquivo_fornecedor_escritorio->extension();
                    $request->arquivo_fornecedor_escritorio->storeAs("$this->path/$idEmpresa/", $name);
                    $result = "";
                } else {
                    return response()->json(["msg" => "Arquivo inválido!"], 500);
                }
            } else {
                return response()->json(["msg" => "Arquivo não encontrado!"], 500);
            }
            return response()->json(["msg" => "Importação realizada com sucesso!", $result], 200);

        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), 500);
        }
    }

    public function lerArquivoFornecedor($idEmpresa) {
        try {
            $duplicatas = DuplicataPagar::where("empresa_id", $idEmpresa)->delete();
            Excel::import(new DuplicataPagarImport($idEmpresa), storage_path("app/arquivos/fornecedores/$idEmpresa/$this->nomeArquivoFornecedor.xls", null, \Maatwebsite\Excel\Excel::XLS));
            return "";
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }
    }

    public function lerArquivoFornecedorEscritorio($idEmpresa) {
        try {
            $array = Excel::toArray(null, storage_path("app/arquivos/fornecedores/$idEmpresa/$this->nomeArquivoFornecedorEscritorio.xls"));
            return $array;
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }
    }

    public function confrontar($idEmpresa) {
        $result = $this->lerArquivoFornecedorEscritorio($idEmpresa);
        $linha = [];
        $linhaComErro = [];
        array_shift($result[0]);
        $dados = [];
        $duplicatas = DuplicataPagar::select("cnpj", "nome_fornecedor")->distinct()->get();
        foreach ($duplicatas as $key => $value){
            $cnpj = $value["cnpj"];
            $dado = null;
            foreach ($result[0] as $k) {
                $dado = array_search($cnpj, $k);
                if($dado) {
                    array_push($linha, $k);
                    break;
                }
            }
            if(!$dado){
                array_push($linhaComErro, [$value["nome_fornecedor"], $value["cnpj"]]);
            } else {
                // array_push($linha, [$value]);
            }
        }
        //exporta dados corretos
        $export = new ResultFornecedoresOk($linha);
        Excel::store($export, "arquivos/fornecedores/$idEmpresa/fornecedoresOk.xls", 'local', \Maatwebsite\Excel\Excel::XLS);
        Excel::store($export, "arquivos/fornecedores/$idEmpresa/fornecedoresOk.pdf", 'local', \Maatwebsite\Excel\Excel::DOMPDF);

        $exportComErro = new ResultFornecedoresComErro($linhaComErro);
        Excel::store($exportComErro, "arquivos/fornecedores/$idEmpresa/fornecedoresComErro.xls", 'local', \Maatwebsite\Excel\Excel::XLS);
        Excel::store($exportComErro, "arquivos/fornecedores/$idEmpresa/fornecedoresComErro.pdf", 'local', \Maatwebsite\Excel\Excel::DOMPDF);
        return  $linhaComErro;
    }

    public function baixarArquivoFornecedoresComErro($idEmpresa, $extensao) {
        $array = Excel::toArray(null, storage_path("app/arquivos/fornecedores/$idEmpresa/fornecedoresComErro.xls"));
        return
        $extensao == 'xls'
        ? Excel::download(new ResultFornecedoresComErro($array), 'fornecedores-com-erro.xls', \Maatwebsite\Excel\Excel::XLS, ['Content-Type' => 'text/xls'])
        : Excel::download(new ResultFornecedoresComErro($array), 'fornecedores-com-erro.pdf', \Maatwebsite\Excel\Excel::DOMPDF, ['Content-Type' => 'application/pdf']);
    }

    public function baixarArquivoFornecedoresOk($idEmpresa, $extensao) {
        $array = Excel::toArray(null, storage_path("app/arquivos/fornecedores/$idEmpresa/fornecedoresOk.xls"));
        return
        $extensao == 'xls'
        ? Excel::download(new ResultFornecedoresOk($array), 'fornecedores-ok.xls', \Maatwebsite\Excel\Excel::XLS, ['Content-Type' => 'text/xls'])
        : Excel::download(new ResultFornecedoresOk($array), 'fornecedores-ok.pdf', \Maatwebsite\Excel\Excel::DOMPDF, ['Content-Type' => 'application/pdf']);
    }
}
