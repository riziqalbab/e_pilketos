<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('paslon', function (Blueprint $table) {
            $table->id('id_paslon')->primary();
            $table->unsignedBigInteger("id_kategori");
            $table->string('nama_paslon');
            $table->integer("nomor_urut");
            $table->text('deskripsi');
            $table->text('img_paslon');
            $table->integer('count')->default(0);
            $table->foreign("id_kategori")->references("id_kategori")->on("kategori")->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('paslons');
    }
};
