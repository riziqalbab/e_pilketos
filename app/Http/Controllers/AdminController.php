<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __invoke()
    {
        return Inertia::render("Admin/Admin");
    }
    public function dpt(Request $request){

        $kelas = Kelas::all();
        return Inertia::render("Admin/DPT", [
            "kelas"=> $kelas
        ]);
        
    }

    public function storedpt(Request $request){
        $request->validate([
            "dpt" => "required"
        ]);

        $user = User::create([
            'nama_lengkap' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $kelas = Kelas::all();
    }   
}
