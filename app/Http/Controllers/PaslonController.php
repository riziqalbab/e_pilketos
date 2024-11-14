<?php

namespace App\Http\Controllers;
use App\Models\Kategori;
use App\Models\Paslon;
use App\Models\UserVote;
use App\Models\Waktu;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PaslonController extends Controller
{
    public function paslon()
    {


        $is_user_voted = UserVote::where([
            "id_user" => Auth::user()->id,
        ])->get();

        $url = url("");
        $paslon_kategori = Kategori::with(['paslon' => function ($query) {
            $query->select('id_kategori', 'nama_paslon', 'img_paslon', 'id_paslon', 'nomor_urut', 'deskripsi');
        }])->get();

        $time_vote = Waktu::find(1);

        return Inertia::render("Home", [
            "site_url" => $url,
            "paslon_kategori" => $paslon_kategori,
            "is_user_voted" => $is_user_voted,
            "time_vote" => $time_vote
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
    public function editPaslon()
    {
        $url = url("");
        $kategori = Kategori::all();

        $paslon_kategori = Kategori::with("paslon")->get();
        return Inertia::render("Admin/EditPaslon", [
            "site_url" => $url,
            "paslon_kategori" => $paslon_kategori,
            "kategori" => $kategori
        ]);
    }

    public function storeEdit(Request $request)
    {
        $request->validate([
            "nama_paslon" => "required",
            "id_kategori" => "required",
            "nomor_urut" => "required",
            "deskripsi" => "required",
            "img_paslon" => "nullable|file|mimes:jpg,png,pdf|max:5240"
        ], [
            "nama_paslon" => "Nama wajib diisi",
            "id_kategori" => "Kategori wajib diisi",
            "nomor_urut" => "Nomor urut wajib diisi",
            "deskripsi" => "Deskripsi wajib diisi",
            "img_paslon" => "Masukan Foto dengan benar",
        ]);

        $paslon = Paslon::find($request->id_paslon);
        $img_paslon = $paslon->img_paslon;
        if ($request->hasFile("img_paslon")) {
            $img_paslon = explode("/", $request->file("img_paslon")->store("images", "local"))[1];
        }

        $paslon->update([
            "nama_paslon" => $request->nama_paslon,
            "id_kategori" => $request->id_kategori,
            "nomor_urut" => $request->nomor_urut,
            "deskripsi" => $request->deskripsi,
            "img_paslon" => $img_paslon,
        ]);

        return redirect()->back()->with([
            "success" => true
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

    public function storeEditKategori(Request $request)
    {

        $request->validate([
            "nama_kategori" => "required|unique:kategori,nama_kategori"
        ], [
            "nama_kategori" => "Wajib Diisi",
            "nama_kategori.unique" => "Kategori Sudah Ada"
        ]);

        $kategori = Kategori::find($request->id_kategori);
        $kategori->update([
            "nama_kategori" => $request->nama_kategori
        ]);

        return redirect()->back()->with([
            "success" => true,
        ]);
    }




    public function vote(Request $request)
    {


        $request->validate([
            "id_paslon" => "required"
        ]);
        $time_vote = Waktu::find(1);
        $time_now = Carbon::now();

        $time_now = $time_now->format("Y-m-d H:i:s");
        if ($time_now < $time_vote->begin) {
            return redirect()->back()->withErrors([
                "success" => false,
                "error" => "Pelaksanaan voting belum dimulai"
            ]);
        } else if ($time_now > $time_vote->end) {
            return redirect()->back()->withErrors([
                "success" => false,
                "error" => "Pelaksanaan voting telah berakhir"
            ]);
        }

        $kategori_paslon_voted = Paslon::find($request->id_paslon)->kategori->id_kategori;

        $is_voted = UserVote::where([
            "id_user" => Auth::user()->id,
            "id_kategori" => $kategori_paslon_voted
        ])->get();

        if (count($is_voted) < 1) {
            UserVote::create([
                "id_user" => Auth::user()->id,
                "id_paslon" => $request->id_paslon,
                "id_kategori" => $kategori_paslon_voted
            ]);
            Paslon::find($request->id_paslon)->increment("count");
            return redirect()->back()->with([
                "success" => true
            ]);
        }
        return redirect()->back()->with([
            "success" => false
        ])->withErrors([
                    "error" => "Kamu sudah memilih"
                ]);




        // $is_voted = UserVote::where([
        //     "id_user" => Auth::user()->id,
        //     "id_paslon" => $request->id_paslon
        // ])->get();

        // if (count($is_voted) < 1) {
        //     Log::info("True");
        // }
    }
}
