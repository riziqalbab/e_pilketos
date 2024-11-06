<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kategori extends Model
{

    protected $table = "kategori";
    protected $primaryKey = 'id_kategori';

    protected $fillable = [
        "nama_kategori"
    ];

    
    public $timestamps = false;


    public function paslon(): HasMany
    {
        return $this->hasMany(Paslon::class, "id_kategori", "id_kategori");
    }
}
