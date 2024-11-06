<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Paslon extends Model
{

    protected $table = "paslon";
    protected $primaryKey = 'id_paslon';

    protected $fillable = [
        "id_paslon",
        "id_kategori",
        "nama_paslon",
        "deskripsi",
        "img_paslon",
        "count"
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, "id_kategori", "id_kategori");
    }

    
}
