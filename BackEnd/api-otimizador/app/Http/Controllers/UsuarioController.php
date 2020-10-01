<?php

namespace App\Http\Controllers;
use App\Http\Requests\UsuarioRequest;
use App\User;
use App\Models\TipoUsuario;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function listar(Request $request){
        try {
            $filtro = ($request->filtro && $request->filtro != null) ? $request->filtro : null;
            $query = User::with(["tipoUsuario"]);
            if($filtro != 'todos') {
                $query = $query->where('nome', "LIKE", "%" . $filtro . "%")->orWhere('login', "LIKE", "%" . $filtro . "%");
                $query = $query->orWhere(function ($q) {
                    $q->select("tipo")
                    ->from('tipo_usuarios')
                    ->whereColumn('id_tipo_usuario', 'usuarios.tipo_usuario_id')->limit(1);
                }, 'LIKE', "%" . $filtro . "%");
                $usuarios = $query->paginate(10);
            } else {
                    $usuarios = $query->paginate(10);
            }
                return response()->json($usuarios, 200);
            } catch (\Exception $ex) {
                return response()->json(["msg", "Erro ao listar usuários!", $ex->getMessage()], 400);
            }
        }

        public function listarTodos(Request $request) {
            try {
                $filtro = ($request->filtro && $request->filtro != null) ? $request->filtro : null;
                $query = User::where('nome', "LIKE", "%" . $filtro . "%")->orWhere('login', "LIKE", "%" . $filtro . "%");
                $usuarios = $query->get();
                return response()->json($usuarios, 200);
        } catch (\Exception $ex) {
            return response()->json(["msg", "Erro ao listar usuários!", $ex->getMessage()], 400);
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
        try {
            $user = $this->listarPorId(auth('api')->user()->id_usuario)->original;
            if(!$user->tipo_usuario->tipo == 'GERENTE') {
                return  response()->json(["error" => "Usuário não autorizado!"], 401);
            }
            $usuario = User::findOrFail($id);

            if($usuario){
                $usuario->delete();
                return  response()->json($usuario, 200);
            }
        } catch (\Throwable $th) {
            return  response()->json(["msg" => "Erro na exclusao"], 400);
        }

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
