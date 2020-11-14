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
            if($idLayoutPagamento) {
                $layoutPagamento = Layout::findOrFail($idLayoutPagamento);
            } else {
                $layoutPagamento = new Layout();
            }
            $campos = '';
            foreach($request->all() as $key => $value) {
                if($key === 'descricao') {
                    $descricao = $value;
                } else {
                    $campos .= $key . '=' . $value . ';';
                }
            }
            DB::update('UPDATE layouts SET campos=? where id_layout=?', [$campos, $idLayoutPagamento]);
            DB::update('UPDATE pagamentos SET descricao=? where layout_id=?', [$descricao, $idLayoutPagamento]);

            return response()->json(['msg' => 'Layout gravado com sucesso!'], 200);
        } catch (\Exception $ex) {
            return response()->json(['msg' => 'Erro ao gravar layout', $ex->getMessage()], 500);
        }
    }
}
