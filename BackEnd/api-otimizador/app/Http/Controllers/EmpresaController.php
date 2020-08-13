<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;

class EmpresaController extends Controller
{
    public function listar(){
        try {
                $empresas = Empresa::paginate(10);
                if ($empresas)
                    return response()->json($empresas, 200);
                else
                    return response()->json(["msg"=> "Não encontrou dados!" ], 200);
            } catch (\Exception $ex) {
                return response()->json(["msg"=> "Erro ao listar empresas!" ], 400);
        }
    }

    public function listarPorId(Request $request, $id){
        try {
                // $id = $request->get("id") ? $request->get("id") : null;
                if($id!= null) {
                    $query = Empresa::with('usuario');
                    $empresas = $query->findOrFail($id);

                    if($empresas)
                        return response()->json($empresas, 200);
                    else
                        return response()->json(["msg"=> "Não encontrado empresa com o $id." ], 200);
                }
                    return response()->json(["msg"=> "Erro ao realizar consulta com esse $id!" ], 400);
            } catch (\Exception $ex) {
                return response()->json(["msg"=> "Erro ao consultar empresa com o $id.", $ex], 400);
        }
    }
}
