<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = "usuarios";
    protected $primaryKey = "id_usuario";

    protected $fillable = [
        'id_usuario',
        'nome',
        'login',
        'tipo_usuario',
    ];

    protected $hidden = [
        'senha'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function setPasswordAttribute($value){
        $this->attributes['senha'] = bcrypt($value);
    }

    public function tipoUsuario() {
        return $this->hasOne('App\Models\TipoUsuario', 'id_tipo_usuario');
    }

    public function empresas() {
        return $this->belongsTo('App\Models\Empresa', 'id_empresa');
    }
}
