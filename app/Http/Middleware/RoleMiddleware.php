<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    
    public function handle(Request $request, Closure $next, $role): Response
    {



        if($request->path() == "/" && $request->user()->role->id_role == "admin") {
            return redirect()->route("admin");
        }

        // if ($request->user()->role->nama_role != $role) {
        //     return redirect()->route("home");
        // }

        return $next($request);
    }
}
