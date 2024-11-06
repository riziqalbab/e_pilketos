<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __invoke()
    {
        return Inertia::render("Admin/Admin");
    }
    
}
