<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function __invoke()
    {

        $kelas = Kelas::all();
        return Inertia::render("Admin/Kelas", [
            "kelas"=> $kelas
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            "nama_kelas" => "required|unique:kelas,nama_kelas"
        ], [
            "nama_kelas.required" => "Nama kelas wajib diisi",
            "nama_kelas.unique" => "Nama kelas sudah ada"
        ]);

        Kelas::create($request->all());
    }
}
