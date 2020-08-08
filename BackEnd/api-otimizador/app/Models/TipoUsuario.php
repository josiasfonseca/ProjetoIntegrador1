<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoUsuario extends Model
{
    use SoftDeletes;

    protected $table = "tipo_usuarios";
    protected $primaryKey = "id_tipo_usuario";

    protected $fillable = [
        'id_tipo_usuario',
        'tipo',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function usuarios() {
        return $this->belongsTo('App\User', 'id_usuario');
    }
}
