<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Controle extends Model
{
    use SoftDeletes;

    protected $table = "controles";
    protected $primaryKey = "id_controle";

    protected $fillable = [
        'id_controle',
        'ano',
        'empresa_id',
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function empresa() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa', 'empresa_id');
    }

    public function observacoes() {
        return $this->hasMany('App\Models\Observacao', 'controle_id', 'id_controle');
    }
}
