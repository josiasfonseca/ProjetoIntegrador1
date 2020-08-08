<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cartao extends Model
{
    use SoftDeletes;

    protected $table = "cartoes";
    protected $primaryKey = "id_cartao";

    protected $fillable = [
        'id_cartao',
        'descricao',
        'id_empresa',
        'id_layout',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function empresa() {
        return $this->hasOne('App\Empresa', 'id_empresa');
    }

    public function layout() {
        return $this->hasOne('App\Models\Layout', 'id_layout');
    }

}
