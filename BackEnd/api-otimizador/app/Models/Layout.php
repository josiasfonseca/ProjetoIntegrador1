<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Layout extends Model
{
    use SoftDeletes;

    protected $table = "layouts";
    protected $primaryKey = "id_layout";

    protected $fillable = [
        'id_layout',
        'descricao',
        'comand_create',
        'comand_insert',
        'comand_select',
        'comand_delete',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function pagamentos() {
        return $this->belongsTo('App\Models\Pagamento', 'id_pagamento');
    }

    public function cartoes() {
        return $this->belongsTo('App\Models\Cartao', 'id_cartao');
    }

    public function recebimentos() {
        return $this->belongsTo('App\Models\Recebimento', 'id_recebimento');
    }
}
