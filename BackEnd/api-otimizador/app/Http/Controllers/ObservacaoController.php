<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Observacao;

class ObservacaoController extends Controller
{
    public function listar(){
        try {
                $observacoes = Observacao::paginate(12);
                if ($observacoes)
                    return response()->json($observacoes, 200);
                else
                    return response()->json(["msg"=> "Não encontrou dados!" ], 200);
            } catch (\Exception $ex) {
                return response()->json(["msg"=> "Erro ao listar observações!" ], 400);
        }
    }

    // Lista observacao por id do Controle
    public function listarPorId($idControle){
        try {
            $query = Observacao::with("controles");
            $observacoes = $query->where("controle_id", $idControle)->paginate(12);
            if($observacoes)
              return response()->json($observacoes, 200);
            else
                return response()->json(['msg' => "Erro ao buscar controles com o id dessa empresa"], 400);
        } catch (\Exception $ex) {
            return response()->json(['msg' => "Erro ao buscar controles com o id dessa empresa", $ex], 400);
        }
    }
}
