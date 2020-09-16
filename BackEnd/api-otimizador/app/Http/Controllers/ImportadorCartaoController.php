<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cartao;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ResultCartao;


class ImportadorCartaoController extends Controller
{
    private $path = "arquivos/cartoes/";
    private $nomeArquivoCartao = "cartao";
    private $nomeArquivoCartaoEscritorio = "cartao_escritorio";
    private $pathBase;

    public function __construct()
    {
        $this->pathBase  = storage_path() . "/app/";
    }

    public function carregarArquivo(Request $request, $idEmpresa = null) {
        try {
            if($request->hasFile("arquivo_cartao")) {
                if($request->arquivo_cartao->isValid() && $idEmpresa != null ){
                    $name = $this->nomeArquivoCartao . "." . $request->arquivo_cartao->clientExtension();
                    $request->arquivo_cartao->storeAs("$this->path/$idEmpresa/", $name);
                    $result = $this->lerArquivoCartao($idEmpresa);
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

    public function lerArquivoCartao($idEmpresa) {
        try {
            $array = Excel::toArray(null, storage_path("app/arquivos/cartoes/$idEmpresa/$this->nomeArquivoCartao.xls"));
            return $array;
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }
    }

    public function gerarArquivoContabilidade($idEmpresa) {
        try {

            $result = $this->lerArquivoCartao($idEmpresa);
            $linha = [];
            array_shift($result[0]);
            $resultado = array_slice($result[0], 8);
            foreach ($resultado as $key => $value){

                $qnt = $value[1] - 2;
                $data = date( "d/m/Y", strtotime( "1900-01-01 +$qnt day" ) );
                $valorBruto = number_format($value[6], 2, ",", ".");
                $valorLiquido =  number_format($value[10], 2, ",", ".");
                $taxa = number_format(($value[8] * (-1)), 2, ",", ".");

                array_push($linha, [$data, $valorBruto, $valorLiquido, $taxa]);
            }
            $export = new ResultCartao($linha);
            Excel::store($export, "arquivos/cartoes/$idEmpresa/cartoes.xls", 'local', \Maatwebsite\Excel\Excel::XLS);
            Excel::store($export , "arquivos/cartoes/$idEmpresa/cartoes.pdf", 'local', \Maatwebsite\Excel\Excel::DOMPDF);
            return response()->json($linha, 200);
        } catch (\Exception $ex) {
            return response()->json(["error" => $ex->getMessage()], 500);
        }
    }

    public function baixarArquivoCartao($idEmpresa, $extensao) {
        try {

            $array = Excel::toArray(null, storage_path("app/arquivos/cartoes/$idEmpresa/cartoes.xls"));
            unset($array[0][0]);
            return
            $extensao == 'csv'
            ? Excel::download(new ResultCartao($array), 'ArquivoCartao-$idEmpresa.csv', \Maatwebsite\Excel\Excel::CSV,
            ['Content-Type' => 'text/csv'])
            : Excel::download(new ResultCartao($array), 'ArquivoCartao-$idEmpresa.pdf', \Maatwebsite\Excel\Excel::DOMPDF,
            ['Content-Type' => 'application/pdf']);
        } catch (\Exception $ex) {
            return response()->json(["error" => $ex->getMessage()], 500);
        }
    }
}
