<?php

namespace Database\Seeders;

use App\Models\HomeroomTeacher;
use App\Models\User;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Mendapatkan semua wali kelas yang ada
        $homeroomTeachers = HomeroomTeacher::all();

        // Data siswa yang akan dibagikan ke beberapa kelas
        $students = [
            // Kelas 10 A
            [
                'class' => '10 A',
                'students' => [
                    ['name' => 'Rina Anggraini', 'email' => 'rina.anggraini@example.com', 'password' => 'password123', 'nis' => 'NIS1234'],
                    ['name' => 'Budi Santoso', 'email' => 'budi.santoso@example.com', 'password' => 'password123', 'nis' => 'NIS1235'],
                    ['name' => 'Siti Nurhaliza', 'email' => 'siti.nurhaliza@example.com', 'password' => 'password123', 'nis' => 'NIS1236'],
                    ['name' => 'Joko Widodo', 'email' => 'joko.widodo@example.com', 'password' => 'password123', 'nis' => 'NIS1237'],
                    ['name' => 'Agus Pratama', 'email' => 'agus.pratama@example.com', 'password' => 'password123', 'nis' => 'NIS1238'],
                ],
                'homeroom_teacher_id' => 30, // ID wali kelas untuk kelas ini (misalnya ID wali kelas 1)
            ],
            // Kelas 10 B
            [
                'class' => '10 B',
                'students' => [
                    ['name' => 'Dina Oktaviani', 'email' => 'dina.oktaviani@example.com', 'password' => 'password123', 'nis' => 'NIS1239'],
                    ['name' => 'Fajar Alam', 'email' => 'fajar.alam@example.com', 'password' => 'password123', 'nis' => 'NIS1240'],
                    ['name' => 'Indra Kurniawan', 'email' => 'indra.kurniawan@example.com', 'password' => 'password123', 'nis' => 'NIS1241'],
                    ['name' => 'Dewi Lestari', 'email' => 'dewi.lestari@example.com', 'password' => 'password123', 'nis' => 'NIS1242'],
                    ['name' => 'Rudi Hartono', 'email' => 'rudi.hartono@example.com', 'password' => 'password123', 'nis' => 'NIS1243'],
                ],
                'homeroom_teacher_id' => 31, // ID wali kelas untuk kelas ini (misalnya ID wali kelas 2)
            ],
            // Kelas 10 C
            [
                'class' => '10 C',
                'students' => [
                    ['name' => 'Lina Pertiwi', 'email' => 'lina.pertiwi@example.com', 'password' => 'password123', 'nis' => 'NIS1244'],
                    ['name' => 'Sofyan Hadi', 'email' => 'sofyan.hadi@example.com', 'password' => 'password123', 'nis' => 'NIS1245'],
                    ['name' => 'Mira Rahmawati', 'email' => 'mira.rahmawati@example.com', 'password' => 'password123', 'nis' => 'NIS1246'],
                    ['name' => 'Rina Ayu', 'email' => 'rina.ayu@example.com', 'password' => 'password123', 'nis' => 'NIS1247'],
                    ['name' => 'Yusuf Kurniawan', 'email' => 'yusuf.kurniawan@example.com', 'password' => 'password123', 'nis' => 'NIS1248'],
                ],
                'homeroom_teacher_id' => 35, // ID wali kelas untuk kelas ini (misalnya ID wali kelas 3)
            ],
            // Kelas 10 D
            [
                'class' => '10 D',
                'students' => [
                    ['name' => 'Nina Suryani', 'email' => 'nina.suryani@example.com', 'password' => 'password123', 'nis' => 'NIS1249'],
                    ['name' => 'Zulkifli Hasan', 'email' => 'zulkifli.hasan@example.com', 'password' => 'password123', 'nis' => 'NIS1250'],
                    ['name' => 'Hendri Siregar', 'email' => 'hendri.siregar@example.com', 'password' => 'password123', 'nis' => 'NIS1251'],
                    ['name' => 'Intan Puspita', 'email' => 'intan.puspita@example.com', 'password' => 'password123', 'nis' => 'NIS1252'],
                    ['name' => 'Rachmat Sidiq', 'email' => 'rachmat.sidiq@example.com', 'password' => 'password123', 'nis' => 'NIS1253'],
                ],
                'homeroom_teacher_id' => 32, // ID wali kelas untuk kelas ini (misalnya ID wali kelas 4)
            ],
        ];

        // Menambahkan siswa ke masing-masing kelas dengan wali kelas yang sesuai
        foreach ($students as $classData) {
            // Mengambil wali kelas berdasarkan homeroom_teacher_id
            $homeroomTeacher = HomeroomTeacher::find($classData['homeroom_teacher_id']);

            // Membuat siswa untuk kelas ini
            foreach ($classData['students'] as $studentData) {
                // Menyimpan User untuk setiap siswa
                $user = User::create([
                    'name' => $studentData['name'],
                    'email' => $studentData['email'],
                    'password' => Hash::make($studentData['password']),
                    'role' => 'siswa',
                ]);

                // Menyimpan Student yang terhubung dengan User dan wali kelas
                Student::create([
                    'user_id' => $user->id,
                    'nis' => $studentData['nis'],
                    'name' => $studentData['name'],
                    'class' => $classData['class'],
                    'homeroom_teacher_id' => $homeroomTeacher->id, // Wali kelas yang sudah ada
                ]);
            }
        }
    }
}
