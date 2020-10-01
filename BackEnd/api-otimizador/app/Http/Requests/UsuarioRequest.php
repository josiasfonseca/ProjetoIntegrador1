<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\TipoUsuario;

class UsuarioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $tipoid = auth()->user()->tipo_usuario_id;
        $tipo = TipoUsuario::select('tipo')->find($tipoid);
        return [
            'id_usuario' => 'present',
            'nome' => 'required',
            'login' => ($tipo == 'GERENTE' ? 'required|' : '') . 'unique:App\User,login,' . ($this->get('id_usuario') ? $this->get('id_usuario') : 0) . ',id_usuario',
            'senha' =>  ($this->get('id_usuario') == null ? 'required|min:6|max:20' : ''),
            'tipo_usuario_id'=> ($tipo == 'GERENTE' ? 'required|' : ''),
        ];
    }
}
