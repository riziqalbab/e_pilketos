<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Waktu extends Model
{
    
    protected $table = "waktu";
    protected $primaryKey = 'id_waktu';

    protected $fillable = [
        "begin",
        "end"
    ];

    public $timestamps = false;
}
