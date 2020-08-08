<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresa extends Model
{
    use SoftDeletes;

    protected $table = "empresas";
    protected $primaryKey = "id_empresa";

    protected $fillable = [
        'id_empresa',
        'nome',
        'cnpj',
        'usuario_id',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function usuario() {
        return $this->hasOne('App\User', 'id_usuario');
    }

    public function controles() {
        return $this->belongsTo('App\Models\Controle', 'id_controle');
    }

    public function pagamentos() {
        return $this->belongsTo('App\Models\Pagamento', 'id_pagamento');
    }

    public function cartoes() {
        return $this->belongsTo('App\Models\Cartao', 'id_cartao');
    }

    public function recebimentos() {
        return $this->belongsTo('App\Models\Recebimento', 'id_recebimento');
    }

    public function duplicatasPagar() {
        return $this->belongsTo('App\Models\DuplicataPagar', 'id_duplicata_pagar');
    }

    public function duplicatasReceber() {
        return $this->belongsTo('App\Models\DuplicataReceber', 'id_duplicata_receber');
    }
}
