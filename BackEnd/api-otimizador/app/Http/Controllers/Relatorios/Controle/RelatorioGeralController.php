<?php

namespace App\Http\Controllers\Relatorios\Controle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Controle;
use DB;

class RelatorioGeralController extends Controller
{
    private $filtro;

    public function listarGeral(Request $request) {
        try {
            $this->filtro = $request->filtro ?? null;
            $query = Controle::with(['empresa.usuario', 'observacoes']);
            if ($this->filtro) {
                $query = $query->where("ano", $this->filtro);
                $query = $query->orWhere(function ($q) {
                    $q->select("nome")
                    ->from('empresas')
                    ->whereColumn('id_empresa', 'controles.empresa_id')->limit(1);
                }, 'LIKE', "%" . $this->filtro . "%");
                $query = $query->orWhere(function ($a) {
                    $a->select("u.nome")
                    ->from('usuarios', 'u')
                    ->where('id_usuario', function($b) {
                        $b->select('usuario_id')
                        ->from('empresas', 'e')
                        ->whereColumn('e.id_empresa', 'controles.empresa_id')->limit(1);
                    });
                }, 'LIKE', "%" . $this->filtro . "%");
            }

            $controles = $query->paginate(30);
            return response()->json($controles, 200);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), 500);
        }
    }
}
