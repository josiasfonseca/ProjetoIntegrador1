<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Observacao extends Model
{
    use SoftDeletes;

    protected $table = "observacoes";
    protected $primaryKey = "id_observacao";

    protected $fillable = [
        'id_observacao',
        'observacao',
        'mes_referencia',
        'controle_id',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function controles() {
        return $this->hasOne('App\Models\Controle', 'id_controle');
    }
}
