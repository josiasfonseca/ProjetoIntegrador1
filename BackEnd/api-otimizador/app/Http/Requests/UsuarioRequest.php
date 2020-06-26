<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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

        return [
            'id' => 'present',
            'nome' => 'required',
            'login' => 'required|unique:App\User,login,' . ($this->get('id') ? $this->get('id') : 0),
            'senha' =>  ($this->get('id') == null ? 'required|min:6|max:20' : ''),
            'ativo'=> 'required',
            'tipo'=> 'required',
        ];
    }
}
