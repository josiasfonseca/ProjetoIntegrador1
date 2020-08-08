<?php

namespace App\Http\Controllers;
use App\Http\Requests\UsuarioRequest;
use App\User;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function listar(){
        $usuarios = User::paginate(10);
        sleep(1);
            return response()->json($usuarios);
    }

    public function listarPorId($id){
        $usuario = User::find($id);
        if($usuario)
            return response()->json($usuario);
        else
        return response()->json(['msg' => "Erro ao buscar usuario com id "]);
    }

    public function incluir(UsuarioRequest $request){
        $usuario = new User();

        foreach($request->all() as $key => $value){
            if($key != '_method' && $key != '_token'){
                $usuario->$key = $value;
                if($key == 'login') {
                    $usuario->$key = strtolower($usuario->$key);
                }
                if($key == 'senha'){
                    $usuario->$key = bcrypt($value);
                }
            }
        }

        if($usuario->save())
            return response()->json($usuario);
        else
            return  response()->json(["msg" => "Erro na inclusao"], $request);
    }

    public function excluir($id){
        $usuario = User::findOrFail($id);

        if($usuario){
            $usuario->delete();
            return  response()->json($usuario, 200);
        }

        return  response()->json(["msg" => "Erro na exclusao"], 400);
    }

    public function atualizar($id, UsuarioRequest $request){
        $usuario = User::findOrFail($id);
        if($usuario){
            foreach($request->all() as $key => $value){
                if($key != '_method' && $key != '_token'){
                    $usuario->$key = $value;
                    if($key == 'login') {
                        $usuario->$key = strtolower($usuario->$key);
                    }
                    if($key == 'senha'){
                        unset($usuario->$key);
                    }
                }
            }
            $usuario->save();
        }
        return response()->json($request);
    }


}
