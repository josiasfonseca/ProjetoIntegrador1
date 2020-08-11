<?php

namespace App\Http\Controllers;
use App\Http\Requests\UsuarioRequest;
use App\User;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function listar(){
        try {
            $query = User::with(["tipoUsuario"]);
            $usuarios = $query->paginate(10);
                return response()->json($usuarios, 200);
        } catch (\Exception $ex) {
            return response()->json(["msg", "Erro ao listar usuários!"], 406);
        }
    }

    public function listarPorId($id){
        try {

            $query = User::with(["tipoUsuario"]);
            $usuario = $query->find($id);
            if($usuario)
                return response()->json($usuario, 200);
            else
                return response()->json(['msg' => "Usuario $id não encontrado!"], 406);
            } catch (\Exception $ex) {
                return response()->json(['msg' => "Erro ao buscar usuario com id $id!"], 400);

        }
    }

    public function incluir(UsuarioRequest $request){
        try {
            $usuario = new User();

            foreach($request->all() as $key => $value){
                if($key != '_method' && $key != '_token'){
                    $usuario->$key = $value;
                    if($key == 'login') {
                        $usuario->$key = strtolower($usuario->$key);
                        $usuario->$key = str_replace(" ", "", $usuario->$key);
                    }
                    if($key == 'senha'){
                        $usuario->$key = bcrypt($value);
                    }
                }
            }

            if($usuario->save())
                return response()->json($usuario, 200);
            else
                return  response()->json(["msg" => "Erro na inclusao", "dados" => $usuario], 400);
            } catch (\Exception $ex) {
                return  response()->json(["msg" => "Erro na inclusao", "dados" => $usuario], 400);
        }
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
        return response()->json($request, 200);
    }


}
