<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\PaslonController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PaslonController::class, "paslon"]);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');




// ==============================> ADMIN

Route::get("/admin", AdminController::class);
Route::get("/admin/tambah", [PaslonController::class, "tambah"]);
Route::post("/admin/tambah", [PaslonController::class, "storePaslon"]);

Route::get("/paslon/image/{path}", [PaslonController::class, "getPrivateFile"]);

Route::get("/admin/kategori", [PaslonController::class, "kategori"]);
Route::post("/admin/kategori", [PaslonController::class, "storeKategori"]);

Route::get("/admin/kelas", KelasController::class);
Route::post("/admin/kelas", [KelasController::class, "store"]);

Route::get("/admin/dpt", [AdminController::class, "dpt"]);




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
