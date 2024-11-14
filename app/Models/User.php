<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'username',
        'id_kelas',
        'nama_lengkap',
        'nama_ibu',
        'password',
        'id_role',
        'show_password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "id",
        "created_at",
        "updated_at",
        'email_verified_at',
        'remember_token',
        'id_kelas',
        'nama_ibu',
        'password',
        'id_role',
        'show_password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function kelas(): BelongsTo{
        return $this->belongsTo(Kelas::class, "id_kelas", "id_kelas");
    }
    public function role(): BelongsTo{
        return $this->belongsTo(Roles::class, "id_role", "id_role");
    }

    public function votes()
    {
        return $this->belongsToMany(Paslon::class, 'user_vote', 'id_user', 'id_paslon');
    }
}
