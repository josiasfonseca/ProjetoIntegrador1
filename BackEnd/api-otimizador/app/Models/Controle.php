<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Controle extends Model
{
    use SoftDeletes;
    use LogsActivity;

    protected $table = "controles";
    protected $primaryKey = "id_controle";

    protected $fillable = [
        'id_controle',
        'ano',
        'empresa_id',
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //Sistema de log
    protected static $logAttributes = [ '*' ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

    public function empresa() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa', 'empresa_id');
    }

    public function observacoes() {
        return $this->hasMany('App\Models\Observacao', 'controle_id', 'id_controle');
    }
}
