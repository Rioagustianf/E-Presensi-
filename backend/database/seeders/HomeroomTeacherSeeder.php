<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HomeroomTeacher;
use App\Models\User;

class HomeroomTeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Mengambil user dengan role 'wali_kelas'
        $waliKelasUsers = User::where('role', 'wali_kelas')->get();

        // Menambahkan homeroom teacher berdasarkan user wali_kelas
        foreach ($waliKelasUsers as $waliKelasUser) {
            HomeroomTeacher::create([
                'user_id' => $waliKelasUser->id,
                'name' => $waliKelasUser->name,
                'email' => $waliKelasUser->email,
            ]);
        }
    }
}
