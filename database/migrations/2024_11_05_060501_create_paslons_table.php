<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('paslon', function (Blueprint $table) {
            $table->id('id_paslon')->primary();
            $table->unsignedBigInteger("id_kategori");
            $table->string('nama_paslon');
            $table->text('deskripsi');
            $table->text('img_paslon');
            $table->integer('count');

            $table->foreign("id_kategori")->references("id_kategori")->on("kategori");
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('paslons');
    }
};
