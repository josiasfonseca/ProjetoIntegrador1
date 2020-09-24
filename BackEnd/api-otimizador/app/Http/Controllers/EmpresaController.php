<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmpresaRequest;
use Illuminate\Http\Request;
use App\Models\Empresa;

class EmpresaController extends Controller
{
    public function listar(Request $request){
        try {
                $filtro = ($request->filtro && $request->filtro != null) ? $request->filtro : null;
                if($filtro) {
                    $empresas = Empresa::where("nome", "LIKE", "%" . $filtro . "%")->orWhere("cnpj", "LIKE", "%" . $filtro . "%")->orWhere("id_empresa", $filtro)->paginate(10);
                } else {
                    $empresas = Empresa::paginate(10);
                }
                if ($empresas)
                    return response()->json($empresas, 200);
                else
                    return response()->json(["msg"=> "Não encontrou dados!" ], 200);
            } catch (\Exception $ex) {
                return response()->json(["msg"=> "Erro ao listar empresas!", $ex->getMessage() ], 400);
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

    public function excluir($id){
        try {
            $empresa = Empresa::findOrFail($id);
            if($empresa){
                $empresa->delete();
                return  response()->json($empresa, 200);
            }
        } catch (\Throwable $th) {
            return  response()->json(["msg" => "Erro na exclusao", $ex->getMessage()], 400);
        }
    }

    public function incluir(Request $request){
        try {
            $empresa = new Empresa();
            $user = auth()->user();
            $id = $user->id_usuario;
            foreach($request->all() as $key => $value){
                if($key != '_method' && $key != '_token' && $key != 'id_empresa'){
                       $empresa->$key = strtoupper($value);
                }
            }
            $empresa->usuario_id = $id;
            if($empresa->save())
                return response()->json($empresa, 200);
            else
                return  response()->json(["msg" => "Erro na inclusao", "dados" => $empresa], 400);
            } catch (\Exception $ex) {
                return  response()->json(["msg" => "Erro na inclusao", "dados" => $ex->getMessage()], 400);
            }
        }

        public function atualizar($id, EmpresaRequest $request){
            try {
                $empresa = Empresa::findOrFail($id);
                if($empresa){
                    foreach($request->all() as $key => $value){
                        if($key != '_method' && $key != '_token' && $key != 'id_empresa'){
                            $empresa->$key = strtoupper($value);
                        }
                    }
                    $empresa->save();
                }
                return response()->json($request, 200);
            } catch (\Throwable $th) {
                return  response()->json(["msg" => "Erro na atualização", "dados" => $ex->getMessage()], 400);
        }
    }
}
