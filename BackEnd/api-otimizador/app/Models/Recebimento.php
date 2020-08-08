<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recebimento extends Model
{
    use SoftDeletes;

    protected $table = "recebimentos";
    protected $primaryKey = "id_recebimento";

    protected $fillable = [
        'id_recebimento',
        'id_empresa',
        'id_layout',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function empresa() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa');
    }

    public function layouts() {
        return $this->belongsTo('App\Models\Layout', 'id_layout');
    }
}
