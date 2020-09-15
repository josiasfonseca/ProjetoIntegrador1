<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class apiJwtRoute extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $ex) {
            if($ex instanceof TokenInvalidException) {
                return response()->json(['status' => 'Token invalido!'], 401);
            } else if ($ex instanceof TokenExpiredException) {
                return response()->json(['status' => 'token_expired'], 401);
            } else if ($ex instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){
                return response()->json(['error' => 'token_has_been_blacklisted'], 401);
            } else {
                return response()->json(['status' => 'Token não encontrado!'], 401);
            }
        }
        return $next($request);
    }
}
