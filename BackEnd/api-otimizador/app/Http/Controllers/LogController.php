<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log;

class LogController extends Controller
{
    public function index(Request $request) {

        try {
            $filtro = $request->filtro ?? null;
            $logs = Log::where('description', 'like', "%" . $filtro . "%")->paginate(20);

            return response()->json($logs, 200);
        } catch (\Exception $ex) {
            return response()->json($ex, 500);
        }
    }
}
