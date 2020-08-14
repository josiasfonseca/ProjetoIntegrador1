<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Observacao extends Model
{
    use SoftDeletes;

    protected $table = "observacoes";
    protected $primaryKey = "mes_referencia";
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'observacao',
        'mes_referencia',
        'controle_id',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function controles() {
        return $this->hasOne('App\Models\Controle', 'id_controle', 'controle_id');
    }
}
