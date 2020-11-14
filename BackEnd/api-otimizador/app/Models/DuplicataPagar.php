<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class DuplicataPagar extends Model
{
    // use SoftDeletes;
    use LogsActivity;

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
        'observacao',
        'empresa_id'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //Sistema de log
    protected static $logAttributes = [ '*' ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

    public function empresa() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa');
    }
}
