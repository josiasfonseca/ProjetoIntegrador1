<?php

namespace App\Models\Layouts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Layout;
use Spatie\Activitylog\Traits\LogsActivity;

class LayoutRecebimento extends Layout
{
    use SoftDeletes;
    use LogsActivity;

    protected $table = "recebimentos";
    protected $primaryKey = "id_recebimento";

    protected $fillable = [
        'id_recebimento',
        'id_empresa',
        'id_layout',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //Sistema de log
    protected static $logAttributes = [ '*' ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;


    public function empresa() {
        return $this->hasOne('App\Models\Empresa', 'id_empresa');
    }

    public function layouts() {
        return $this->belongsTo('App\Models\Layout', 'id_layout');
    }
}
