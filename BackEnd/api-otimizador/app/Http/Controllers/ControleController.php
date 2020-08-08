<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Controle;

class ControleController extends Controller
{
    public function listar(){
        $controles = Controle::paginate(10);
            return response()->json($controles);
    }

    public function listarPorId($id){
        $controle = Controle::where("empresa_id", $id)->get();
        if($controle)
            return response()->json($controle);
        else
        return response()->json(['msg' => "Erro ao buscar controle com id "]);
    }

}
