<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Controle;

class ControleController extends Controller
{
    public function listar(){
        try {
            $controles = Controle::paginate(10);
            return response()->json($controles, 200);
        } catch (\Exception $ex) {
            return response()->json(['msg' => "Erro ao buscar controles!", $ex], 400);
        }
    }

    //Lista controles de uma empresa, pelo id da empresa
    public function listarPorId($id){
        try {
            $query = Controle::with(['observacoes', 'empresa.usuario']);
            $controles = $query->where("empresa_id", $id)->orderBy("ano", "desc")->paginate(10);
            if($controles)
              return response()->json($controles, 200);
            else
                return response()->json(['msg' => "Erro ao buscar controles com o id dessa empresa"], 400);
        } catch (\Exception $ex) {
            return response()->json(['msg' => "Erro ao buscar controles com o id dessa empresa", $ex], 400);
        }
    }

    //Lista controle pelo id do controle
    public function listarControle($id) {
        try {
            $query = Controle::with('empresa.usuario');
            $controle = $query->find($id);
            if ($controle)
                return response()->json($controle, 200);
            else
                return response()->json(['msg' => "Erro ao busca controle pelo id"], 400);
        } catch (\Exception $ex) {
            return response()->json(['msg' => "Erro ao busca controle pelo id", $ex], 400);
        }
    }

    public function incluir(Request $request){
        try {
            $controle = new Controle();

            foreach($request->all() as $key => $value){
                    $controle->$key = $value;
                        $controle->$key = strtoupper($controle->$key);
            }

            if($controle->save())
                return response()->json($controle, 200);
            else
                return  response()->json(["msg" => "Erro na inclusao", "dados" => $controle], 400);
            } catch (\Exception $ex) {
                return  response()->json($ex, 400);
        }
    }

    public function atualizar($id, Request $request){
        $controle = Controle::findOrFail($id);
        if($controle){
            foreach($request->all() as $key => $value){
                $controle->$key = $value;
                    $controle->$key = strtoupper($controle->$key);
            }
            $controle->save();
        }
        return response()->json($controle, 200);
    }

}
