<?php

namespace App\Http\Controllers;

use App\Models\Waktu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WaktuController extends Controller
{
    public function __invoke()
    {
        return Inertia::render("Admin/Waktu");
    }

    public function modify(Request $request)
    {
        $request->validate([
            "begin" => "required",
            "end" => "required"
        ]);

        // if(Waktu::)

        // Jika waktu id == 1 ada akan merubah waktu voting, jika tidak ada akan membuat baru dengan id_waktu = 1

        $waktu = Waktu::find(1);
        if ($waktu) {
            $waktu->begin = $request->begin;
            $waktu->end = $request->end;
            $waktu->save();
        } else {
            Waktu::insert([
                "id_waktu" => 1,
                "begin" => $request->begin,
                "end" => $request->end
            ]);
        }

        return redirect()->back()->with([
            "success" => true,
        ]);
    }




}
