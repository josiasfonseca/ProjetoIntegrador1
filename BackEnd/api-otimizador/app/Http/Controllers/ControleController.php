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
            $controles = Controle::where("empresa_id", $id)->orderBy("ano", "desc")->paginate(10);
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
            $query = Controle::with('empresa');
            $controle = $query->find($id);
            if ($controle)
            return response()->json($controle, 200);
            else
            return response()->json(['msg' => "Erro ao busca controle pelo id"], 400);
        } catch (\Exception $ex) {
            return response()->json(['msg' => "Erro ao busca controle pelo id", $ex], 400);
        }
    }
}
