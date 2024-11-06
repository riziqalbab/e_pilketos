<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PaslonController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Home");
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');




// ==============================> ADMIN

Route::get("/admin", AdminController::class);
Route::get("/admin/tambah", [PaslonController::class, "tambah"]);
Route::get("/admin/kategori", [PaslonController::class, "kategori"]);
Route::post("/admin/kategori", [PaslonController::class, "storeKategori"]);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
