<?php

namespace App\Http\Controllers\Relatorios\Controle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Controle;
use DB;

class RelatorioGeralController extends Controller
{
    private $filtro;
    private $filtro2;

    public function listarGeral(Request $request) {
        try {
            $query = Controle::with(['empresa.usuario', 'observacoes']);

            $req = $request->filtro ?? null;
            $result = explode(" ", $req);
            if(sizeof($result) == 2 ){
                $this->filtro = $result[0];
                $this->filtro2 = $result[1];
                $query = $query->where("ano", $this->filtro);
                $query = $query->where(function ($a) {
                    $a->select("u.nome")
                    ->from('usuarios', 'u')
                    ->where('id_usuario', function($b) {
                        $b->select('usuario_id')
                        ->from('empresas', 'e')
                        ->whereColumn('e.id_empresa', 'controles.empresa_id')->limit(1);
                    });
                }, 'LIKE', "%" . $this->filtro2 . "%");
            } else if(sizeof($result) == 1) {
                $this->filtro = $result[0];
                if ($this->filtro) {
                    // filtro pelo ano do controle
                    $query = $query->where("ano", $this->filtro);
                    // filtro pelo nome da empresa
                    $query = $query->orWhere(function ($q) {
                        $q->select("nome")
                        ->from('empresas')
                        ->whereColumn('id_empresa', 'controles.empresa_id')->limit(1);
                    }, 'LIKE', "%" . $this->filtro . "%");
                    // filtro pelo tipo da empresa (L.P. ou L.R. ou S.N.)
                    $query = $query->orWhere(function ($q) {
                        $q->select("tipo")
                        ->from('empresas')
                        ->whereColumn('id_empresa', 'controles.empresa_id')->limit(1);
                    }, 'LIKE', "%" . $this->filtro . "%");
                    // filtro pelo nome do responsável
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
            }
            $query = $query->orderBy("ano", "DESC");
            $controles = $query->paginate(30);
            return response()->json($controles, 200);
        } catch (\Exception $ex) {
            return response()->json($ex->getMessage(), 500);
        }
    }
}
