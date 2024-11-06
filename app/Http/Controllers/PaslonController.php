<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaslonController extends Controller
{
    public function tambah()
    {

        $kategori = Kategori::all();

        return Inertia::render("Admin/TambahPaslon", [
            "kategori"=> $kategori
        ]);
    }
    public function kategori()
    {
        $kategori = Kategori::all();
        return Inertia::render("Admin/Kategori", [
            "kategori" => $kategori
        ]);
    }

    public function storeKategori(Request $request)
    {

        $request->validate([
            "nama_kategori" => "required|unique:kategori,nama_kategori"
        ], [
            "nama_kategori" => "Wajib Diisi",
            "nama_kategori.unique" => "Kategori Sudah Ada"
        ]);


        Kategori::create($request->all());


        return redirect()->back()->with([
            "success" => true,
        ]);
    }
}
