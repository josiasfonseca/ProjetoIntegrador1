<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LogSpatie;

class LogSpatieController extends Controller
{
    public function index() {
        $logs = LogSpatie::all();
        return $logs;
    }
}
