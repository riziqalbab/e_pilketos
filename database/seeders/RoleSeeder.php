<?php

namespace Database\Seeders;

use App\Models\Roles;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Roles::insert([
            [
                "id_role" => "admin",
                "nama_role" => "ADMIN"
            ],
            [
                "id_role" => "pemilih",
                "nama_role" => "PEMILIH",
            ]
        ]);
        
        User::create([
            "id_role" => "admin",
            "username" => "admin",
            "nama_lengkap" => "admin",
            "nama_ibu" => "admin",
            "password" => "adminbaik123",
            "show_password" => "adminbaik123",
        ]);
    }
}
