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

    public function edit(Request $request){

        $request->validate([
            "id_kelas" => "required",
            "nama_kelas" => "required"
        ], [
            "id_kelas" => "ID wajib diisi",
            "nama_kelas" => "Nama kelas wajib diisi",
        ]);

        $kelas = Kelas::find($request->id_kelas);
        $kelas->update($request->all());




    }
}
