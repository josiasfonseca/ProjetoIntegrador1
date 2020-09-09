<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Imports\DuplicataPagarImport;
use App\Models\DuplicataPagar;
use Maatwebsite\Excel\Facades\Excel;

class ImportadorClienteController extends Controller
{
    private $path = "arquivos/cliente/";
    private $nomeArquivoCliente = "fornecedor";
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
                    $name = $this->nomeArquivoCliente . "." . $request->arquivo_cliente->clientExtension();
                    // $name = $idEmpresa . "_" . $this->$request->arquivo_cliente->originalName;
                    $request->arquivo_cliente->storeAs("$this->path/$idEmpresa/", $name);
                } else {
                    return response()->json(["msg" => "Arquivo inválido!"], 500);
                }
            } else if($request->hasFile("arquivo_escritorio")){
                if($request->arquivo_escritorio->isValid() && $idEmpresa != null ) {
                    // $name = $this->nomeArquivoEscritorio . "." . $request->arquivo_escritorio->extension();
                    $name = $idEmpresa . "_" . $this->nomeArquivoEscritorio . "." . $request->arquivo_escritorio->extension();
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
        try {
            Excel::import(new DuplicataPagarImport($idEmpresa), storage_path('app/arquivos/cliente/1/fornecedor.xls', null, \Maatwebsite\Excel\Excel::XLS));

            return response()->json(["msg" => "Arquivo Importado com sucesso!"], 200);
        } catch (\Exception $ex) {
            return response()->json(["error" => "Erro ao importar arquivo!", $ex], 500);
        }
    }

    public function salvarRecebimento() {

    }
}
