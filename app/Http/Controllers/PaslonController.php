<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaslonController extends Controller
{
    public function tambah(){
        return Inertia::render("Admin/TambahPaslon");
    }
}
