<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;

class EmpresaController extends Controller
{
    public function listar(){
        $empresas = Empresa::paginate(10);
            return response()->json($empresas);
    }
}
