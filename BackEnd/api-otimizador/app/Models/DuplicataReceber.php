<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DuplicataReceber extends Model
{
    use SoftDeletes;

    protected $table = "duplicatas_receber";
    protected $primaryKey = "id_duplicata_receber";

    protected $fillable = [
        'id_duplicata_receber',
        'data',
        'cnpj',
        'cod_cliente',
        'nome_cliente',
        'valor_doc',
        'valor_juros',
        'valor_desc',
        'total_pago',
        'numero_nota_fiscal',
        'banco',
        'observacao',
        'empresa_id'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function empresa() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa');
    }
}
