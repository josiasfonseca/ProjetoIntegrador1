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

    // Lista observacao por mes de referencia da observacao
    public function listarPorMesReferencia($idControle, $mes){
        try {
            $query = Observacao::with("controles");
            $observacoes = $query->where("controle_id", $idControle)->where("mes_referencia", $mes)->first();
            if($observacoes)
              return response()->json($observacoes, 200);
            else
                return response()->json(['msg' => "Não encontrado observações dessa empresa"], 400);
        } catch (\Exception $ex) {
            return response()->json(['msg' => "Erro ao buscar observações dessa empresa", $ex], 400);
        }
    }

    //Inclui observação
    public function incluir($idControle, Request $request) {

        try {
            $obs = new Observacao();
            $obs1 = array();
            $observacao = Observacao::where("controle_id", $idControle)->where("mes_referencia", $request->get("mes_referencia"))->get();
            if ($observacao) {
                $obs->controle_id = $idControle;
                $obs->mes_referencia = $request->mes_referencia;
                $obs->observacao = $request->observacao;
                array_push($obs1, ["controle_id" => $idControle, "mes_referencia" => $request->mes_referencia, "observacao" => $request->observacao]);
                if($observacao->update($obs1)) {
                    return response()->json($obs, 200);
                }
                return response()->json(["msg" => "Erro ao atualizar observaçãoss!", $obs], 400);
            }
            else {
                $obs->controle_id = $idControle;
                foreach ($request->all() as $key => $value) {
                    $obs->$key = $value;
                }
            }

            if ($obs->save()) {
                return response()->json($obs, 200);
            } else {
                return response()->json(["msg" => "Erro ao salvar observaçãoss!", $obs], 400);
            }
        } catch (\Exception $ex) {
            return response()->json(["msg" => "Erro ao salvar observaçãoooo!", $ex], 402);
        }
    }
}
