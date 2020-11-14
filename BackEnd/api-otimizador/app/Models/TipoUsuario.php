<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class TipoUsuario extends Model
{
    use SoftDeletes;
    use LogsActivity;

    protected $table = "tipo_usuarios";
    protected $primaryKey = "id_tipo_usuario";

    protected $fillable = [
        'id_tipo_usuario',
        'tipo',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //Sistema de log
    protected static $logAttributes = [ '*' ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

    public function usuarios() {
        return $this->hasMany('App\User', 'id_tipo_usuario', 'id_usuario');
    }
}
