<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmpresaRequest extends FormRequest
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
            'id_empresa' => 'present',
            'nome' => 'required',
            'cnpj' => 'required|unique:App\Models\Empresa,cnpj,' . ($this->get('id_empresa') ? $this->get('id_empresa') : 0) . ',id_empresa',
        ];
    }
}
