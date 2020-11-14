<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogSpatie extends Model
{
    protected $table = "activity_log";
    protected $primaryKey = "id";

    protected $fillable = [
        'id',
        'log_name',
        'description',
        'subject_type',
        'subject_id',
        'causer_type',
        'causer_id',
        'properties'
    ];

    protected $dates = ['created_at', 'updated_at'];
}
