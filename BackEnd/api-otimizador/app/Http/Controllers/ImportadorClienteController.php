<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;

class ImportadorClienteController extends Controller
{
    private $path = "arquivos/cliente/";
    private $nomeArquivoCliente = "cliente";
    private $nomeArquivoEscritorio = "escritorio";
    private $pathBase;

    public function __construct()
    {
        $this->pathBase  = storage_path() . "/app/";
    }

    public function carregarArquivo(Request $request, $idEmpresa = null) {
        try {
            if($request->hasFile("arquivo_cliente")) {
                if($request->arquivo_cliente->isValid() && $idEmpresa != null ){
                    $name = $this->nomeArquivoCliente . "." . $request->arquivo_cliente->extension();
                    $request->arquivo_cliente->storeAs("$this->path/$idEmpresa/", $name);
                } else {
                    return response()->json(["msg" => "Arquivo inválido!"], 500);
                }
            } else if($request->hasFile("arquivo_escritorio")){
                if($request->arquivo_escritorio->isValid() && $idEmpresa != null ) {
                    $name = $this->nomeArquivoEscritorio . "." . $request->arquivo_escritorio->extension();
                    $request->arquivo_escritorio->storeAs("$this->path/$idEmpresa/", $name);
                } else {
                    return response()->json(["msg" => "Arquivo inválido!"], 500);
                }
            } else {
                return response()->json(["msg" => "Arquivo não encontrado!"], 500);
            }
            $teste = $this->lerArquivo($idEmpresa);
            // return response()->json(["msg" => "Upload realizado com sucesso!"], 200);
            return response()->json(["msg" => $teste], 200);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), 500);
        }
    }

    public function lerArquivo($idEmpresa) {
        $diretorio = $this->pathBase . $this->path . "/" . $idEmpresa;
        // if(!is_dir($diretorio)) {
            //     return response()->json(["msg" => "Diretório inválido!"], 500);
            // }
            $arquivo = fopen("$this->pathBase$this->path/$idEmpresa/$this->nomeArquivoCliente.txt", "r");
            $dados = [];
            while(!feof($arquivo)) {
                $linha = fgets($arquivo);
                $array = explode("\t", $linha);
                array_push($dados, mb_convert_encoding($array, "UTF-8", "ASCII"));
                // array_push($dados, $array);
            }
            // var_dump($linha);
            return $dados;
    }

    public function salvarRecebimento() {

    }
}
