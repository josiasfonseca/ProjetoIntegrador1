<?php

namespace App\Http\Controllers\Layouts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Controllers\LayoutController;
use App\Models\Layouts\LayoutPagamento;
use App\Models\Layout;
use DB;

class LayoutPagamentoController extends LayoutController
{
    public function listaLayoutPagamentos($idEmpresa) {
        $query = LayoutPagamento::with('layout');
        $layout = $query->where('empresa_id', $idEmpresa)->get();
        return $layout;
    }

    public function listaLayoutPagamento($idLayoutPagamento) {
        $query = LayoutPagamento::with('layout');
        $query = $query->where('layout_id', $idLayoutPagamento);
        $layout = $query->get();
        return $layout;
    }

    public function atualizaLayoutPagamento(Request $request, $idLayoutPagamento = null) {
        try {
            $descricao = '';
            $layout = Layout::findOrFail($idLayoutPagamento);
            $layoutPagamento = LayoutPagamento::where('layout_id', $idLayoutPagamento)->first();
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
                $layoutPagamento->descricao = $descricao;
                $layoutPagamento->layout_id = $layout->id_layout;
                $layoutPagamento->save();

            DB::commit();

            return response()->json(['msg' => 'Layout gravado com sucesso!'], 200);
        } catch (\Exception $ex) {
            DB::rollback();
            return response()->json(['msg' => 'Erro ao gravar layout', $ex->getMessage()], 500);
        }
    }

    public function incluiLayoutPagamento(Request $request, $idEmpresa) {
        try {
            $descricao = '';
            $layout = new Layout();
            $layoutPagamento = new LayoutPagamento();
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
            $layoutPagamento->descricao = $descricao;
            $layoutPagamento->layout_id = $layout->id_layout;
            $layoutPagamento->empresa_id = $idEmpresa;
            $layoutPagamento->save();

            DB::commit();

            return response()->json(['msg' => 'Layout gravado com sucesso!'], 200);
        } catch (\Exception $ex) {
            DB::rollback();
            return response()->json(['msg' => 'Erro ao gravar layout', $ex->getMessage()], 500);
        }
    }
}
