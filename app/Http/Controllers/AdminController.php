<?php

namespace App\Http\Controllers;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __invoke()
    {

        Log::info(Auth::user()->id);
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

            "username"=> "required|unique:users,username",
            "nama_lengkap"=> "required",
            "id_kelas"=> "required",
            "nama_ibu"=> "required",
            "password"=> "required",
        ], [
            "username.required"=> "Username harus diisi",
            "username.unique"=> "Username sudah terdaftar",
            "nama_lengkap.required"=> "Nama lengkap harus diisi",
            "id_kelas.required"=> "Kelas harus diisi",
            "nama_ibu.required"=> "Nama ibu harus diisi",
            "password.required"=> "Password harus diisi",
        ]);

        User::create([
            "username" => $request->username,
            "nama_lengkap" => $request->nama_lengkap,
            "id_kelas" => $request->id_kelas,
            "nama_ibu" => $request->nama_ibu,
            "show_password" => $request->password,
            "password" => Hash::make($request->password),
        ]);

        return redirect()->back()->with("success", "Data berhasil ditambahkan");

    }   
}
