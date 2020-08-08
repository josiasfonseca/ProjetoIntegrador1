<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DuplicataPagar extends Model
{
    use SoftDeletes;

    protected $table = "duplicatas_pagar";
    protected $primaryKey = "id_duplicata_pagar";

    protected $fillable = [
        'id_duplicata_pagar',
        'data',
        'cnpj',
        'cod_fornecedor',
        'nome_fornecedor',
        'valor_doc',
        'valor_juros',
        'valor_desc',
        'total_pago',
        'numero_nota_fiscal',
        'banco',
        'observacao'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function empresa() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa');
    }
}
