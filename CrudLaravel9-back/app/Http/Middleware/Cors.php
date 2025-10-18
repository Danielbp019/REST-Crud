<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    private $origins = ['https://localhost/', 'http://localhost/'];

    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $origin = $request->header('Origin');

        if (in_array($origin, $this->origins)) {
            $response
                ->header('Access-Control-Allow-Origin', $origin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
        }

        return $response;
    }
}
