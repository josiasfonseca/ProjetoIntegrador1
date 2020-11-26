<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{

    protected $table = "activity_log";
    protected $primaryKey = "id";

    protected $fillable = ['*'];


     //Sistema de log
     protected static $logAttributes = [ '*' ];
     protected static $logOnlyDirty = true;
     protected static $submitEmptyLogs = false;

}
