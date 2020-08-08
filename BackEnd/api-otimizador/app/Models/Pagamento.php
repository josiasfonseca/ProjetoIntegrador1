<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pagamento extends Model
{
    use SoftDeletes;

    protected $table = "pagamentos";
    protected $primaryKey = "id_pagamento";

    protected $fillable = [
        'id_pagamento',
        'id_empresa',
        'id_layout',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function usuario() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa');
    }

    public function layout() {
        return $this->hasOne('App\Models\Layout', 'id_layout');
    }
}
