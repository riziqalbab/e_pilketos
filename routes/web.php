<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\PaslonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WaktuController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {

    
    // ==============================> ADMIN <==============================
    
    
    
    Route::get('/', [PaslonController::class, "paslon"])->name("home");
    Route::get("/paslon/image/{path}", [PaslonController::class, "getPrivateFile"]);

    Route::middleware([RoleMiddleware::class])->group(function () {

        Route::get("/admin", AdminController::class);
        Route::get("/admin/tambah", [PaslonController::class, "tambah"]);
        Route::post("/admin/tambah", [PaslonController::class, "storePaslon"]);



        Route::get("/admin/kategori", [PaslonController::class, "kategori"]);
        Route::post("/admin/kategori", [PaslonController::class, "storeKategori"]);

        Route::get("/admin/paslon", [PaslonController::class, "editPaslon"]);
        Route::post("/admin/paslon", [PaslonController::class, "storeEdit"]);
        
        Route::get("/admin/kelas", KelasController::class);
        Route::post("/admin/kelas", [KelasController::class, "store"]);
        Route::put("/admin/kelas", [KelasController::class, "edit"]);

        Route::get("/admin/dpt", [AdminController::class, "dpt"]);
        Route::post("/admin/dpt", [AdminController::class, "storedpt"]);

        Route::get("/admin/waktu", WaktuController::class);
        Route::put("/admin/waktu", [WaktuController::class, "modify"]);
        
        Route::put("/vote", [PaslonController::class, "vote"]);

    });

});

require __DIR__ . '/auth.php';
