<?php

namespace App\Http\Controllers\Layouts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\LayoutController;
use App\Models\Layouts\LayoutRecebimento;
use App\Models\Layout;
use DB;

class LayoutRecebimentoController extends LayoutController
{
    public function listaLayoutRecebimentos($idEmpresa) {
        $query = LayoutRecebimento::with('layout');
        $layout = $query->where('empresa_id', $idEmpresa)->get();
        return $layout;
    }

    public function listaLayoutRecebimento($idLayoutRecebimento) {
        $query = LayoutRecebimento::with('layout');
        $query = $query->where('layout_id', $idLayoutRecebimento);
        $layout = $query->get();
        return $layout;
    }

    public function atualizaLayoutRecebimento(Request $request, $idLayoutRecebimento = null) {
        try {
            $descricao = '';
            $layout = Layout::findOrFail($idLayoutRecebimento);
            $layoutRecebimento = LayoutRecebimento::where('layout_id', $idLayoutRecebimento)->first();
            $campos = '';
            foreach($request->all() as $key => $value) {
                if($key === 'descricao') {
                    $descricao = $value;
                } else {
                    $campos .= $key . '=' . $value . ';';
                }
            }

            DB::beginTransaction();

                $layout->campos = $campos;
                $layout->save();
                $layoutRecebimento->descricao = $descricao;
                $layoutRecebimento->layout_id = $layout->id_layout;
                $layoutRecebimento->save();

            DB::commit();

            return response()->json(['msg' => 'Layout gravado com sucesso!'], 200);
        } catch (\Exception $ex) {
            DB::rollback();
            return response()->json(['msg' => 'Erro ao gravar layout', $ex->getMessage()], 500);
        }
    }

    public function incluiLayoutRecebimento(Request $request, $idEmpresa) {
        try {
            $descricao = '';
            $layout = new Layout();
            $layoutRecebimento = new LayoutRecebimento();
            $campos = '';
            foreach($request->all() as $key => $value) {
                if($key === 'descricao') {
                    $descricao = $value;
                } else {
                    $campos .= $key . '=' . $value . ';';
                }
            }

            DB::beginTransaction();

            $layout->campos = $campos;
            $layout->save();
            $layoutRecebimento->descricao = $descricao;
            $layoutRecebimento->layout_id = $layout->id_layout;
            $layoutRecebimento->empresa_id = $idEmpresa;
            $layoutRecebimento->save();

            DB::commit();

            return response()->json(['msg' => 'Layout gravado com sucesso!'], 200);
        } catch (\Exception $ex) {
            DB::rollback();
            return response()->json(['msg' => 'Erro ao gravar layout', $ex->getMessage()], 500);
        }
    }
}
