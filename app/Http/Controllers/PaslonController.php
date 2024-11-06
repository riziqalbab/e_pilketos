<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Paslon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PaslonController extends Controller
{

    public function paslon()
    {
        $paslon = Paslon::all();
        return Inertia::render("Home", [
            "paslon"=> $paslon
        ]);

    }
    public function tambah()
    {

        $kategori = Kategori::all();

        return Inertia::render("Admin/TambahPaslon", [
            "kategori" => $kategori
        ]);
    }

    public function getPrivateFile($filename)
    {
        $filename = basename($filename);
        $filePath = "images/{$filename}";

        if (!Storage::disk('local')->exists($filePath)) {
            abort(404, 'File tidak ditemukan');
        }

        $file = Storage::disk('local')->get($filePath);

        $mimeType = Storage::disk('local')->mimeType($filePath);

        return response($file)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline; filename="' . $filename . '"')
            ->header('Cache-Control', 'public, max-age=86400')
            ->header('Pragma', 'public');
    }
    public function storePaslon(Request $request)
    {

        $request->validate([
            "nama_paslon" => "required",
            "id_kategori" => "required",
            "nomor_urut" => "required|unique:paslon,nomor_urut",
            "deskripsi" => "required",
            "img_paslon" => "required|file|mimes:jpg,png,pdf|max:2048"
        ], [
            "nama_paslon" => "Nama wajib diisi",
            "id_kategori" => "Kategori wajib diisi",
            "nomor_urut" => "Nomor urut wajib diisi",
            "nomor_urut.unique" => "Nomor tidak boleh sama",
            "deskripsi" => "Deskripsi wajib diisi",
            "img_paslon" => "Masukan Foto dengan benar",
        ]);


        $img_paslon = explode("/", $request->file("img_paslon")->store("images", "local"))[1];

        Log::info($request->nomor_urut);
        $result = Paslon::create(
            [
                "nama_paslon" => $request->nama_paslon,
                "id_kategori" => $request->id_kategori,
                "nomor_urut" => $request->nomor_urut,
                "deskripsi" => $request->deskripsi,
                "img_paslon" => $img_paslon,
            ]
        );


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
