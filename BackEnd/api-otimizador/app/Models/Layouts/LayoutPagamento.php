<?php

namespace App\Models\Layouts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Layout;
use Spatie\Activitylog\Traits\LogsActivity;

class LayoutPagamento extends Layout
{
    use SoftDeletes;
    use LogsActivity;

    protected $table = "pagamentos";
    protected $primaryKey = "id_pagamento";

    protected $fillable = [
        'id_pagamento',
        'id_empresa',
        'id_layout',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //Sistema de log
    protected static $logAttributes = [ '*' ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;


    public function usuario() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa');
    }

    public function layout() {
        return $this->hasOne('App\Models\Layout', 'id_layout', 'layout_id');
    }
}
