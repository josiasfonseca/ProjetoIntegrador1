<?php

namespace App\Http\Controllers\Layouts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Controllers\LayoutController;
use App\Models\Layouts\LayoutPagamento;

class LayoutPagamentoController extends LayoutController
{
    public function listaLayoutPagamentos($idEmpresa) {
        $query = LayoutPagamento::with('layout');
        $layout = $query->where('empresa_id', $idEmpresa)->get();
        return $layout;
    }

    public function listaLayoutPagamento($idLayoutPagamento) {
        $query = LayoutPagamento::with('layout');
        $layout = $query->get();
        return $layout;
    }
}
