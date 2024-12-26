<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Membuat 20 data user dengan role 'wali_kelas'
        $users = [
            ['name' => 'Joni', 'email' => 'joni@example.com'],
            ['name' => 'Yudi', 'email' => 'yudi@example.com'],
            ['name' => 'Siti', 'email' => 'siti@example.com'],
            ['name' => 'Ani', 'email' => 'ani@example.com'],
            ['name' => 'Budi', 'email' => 'budi@example.com'],
            ['name' => 'Rina', 'email' => 'rina@example.com'],
            ['name' => 'Andi', 'email' => 'andi@example.com'],
            ['name' => 'Tono', 'email' => 'tono@example.com'],
            ['name' => 'Dina', 'email' => 'dina@example.com'],
            ['name' => 'Eka', 'email' => 'eka@example.com'],
            ['name' => 'Indra', 'email' => 'indra@example.com'],
            ['name' => 'Fani', 'email' => 'fani@example.com'],
            ['name' => 'Vina', 'email' => 'vina@example.com'],
            ['name' => 'Rudi', 'email' => 'rudi@example.com'],
            ['name' => 'Lina', 'email' => 'lina@example.com'],
            ['name' => 'Asep', 'email' => 'asep@example.com'],
            ['name' => 'Dewi', 'email' => 'dewi@example.com'],
            ['name' => 'Dedi', 'email' => 'dedi@example.com'],
            ['name' => 'Tina', 'email' => 'tina@example.com'],
        ];

        // Loop untuk menambahkan user ke dalam database
        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password123'), // Password yang di-hash
                'role' => 'wali_kelas',
            ]);
        }
    }
}
