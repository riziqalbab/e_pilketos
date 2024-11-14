<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Roles extends Model
{
    protected $table = "roles";
    protected $primaryKey = 'id_role';

    protected $fillable = [
        "nama_role"
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    
    public $timestamps = false;


    public function siswa(): HasMany
    {
        return $this->hasMany(User::class, "id_role", "id_role");
    }
}
