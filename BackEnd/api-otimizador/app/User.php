<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;
    use LogsActivity;

    protected $table = "usuarios";
    protected $primaryKey = "id_usuario";

    protected $fillable = [
        'id_usuario',
        'nome',
        'login',
        'tipo_usuario_id',
    ];

    protected $hidden = [
        'senha'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //Sistema de log
    protected static $logAttributes = [ '*' ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

    public function setPasswordAttribute($value){
        $this->attributes['senha'] = bcrypt($value);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getAuthIdentifier()
    {
        return $this->login;
    }
    public function getAuthPassword()
    {
        return $this->senha;
    }

    public function tipoUsuario() {
        return $this->hasOne('App\Models\TipoUsuario', 'id_tipo_usuario', 'tipo_usuario_id');
    }

    public function empresas() {
        return $this->hasMany('App\Models\Empresa', 'id_empresa', 'empresa_id');
    }
}
