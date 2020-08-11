<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoUsuario;
class TipoUsuarioController extends Controller
{
    public function listar(){
        $tipos = TipoUsuario::paginate(10);
            return response()->json($tipos);
    }
}
