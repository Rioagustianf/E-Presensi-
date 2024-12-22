<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomeroomTeacher;
use Illuminate\Http\Request;

class HomeroomController extends Controller
{
    /**
     * Mendapatkan semua siswa beserta presensinya berdasarkan id wali kelas
     *
     * @param  int  $teacherId
     * @return \Illuminate\Http\Response
     */
    public function getStudentsByTeacherId($teacherId)
    {
        // Cari wali kelas berdasarkan ID
        $homeroomTeacher = HomeroomTeacher::find($teacherId);

        if (!$homeroomTeacher) {
            return response()->json([
                'message' => 'Wali kelas tidak ditemukan',
            ], 404);
        }

        // Ambil semua siswa yang memiliki homeroom_teacher_id sesuai dengan ID wali kelas
        // Sertakan relasi presensi pada data siswa
        $students = $homeroomTeacher->students()->with('presences', 'permissions')->get();

        return response()->json([
            'data' => $students
        ], 200);
    }

    public function getHomeroomTeachers()
    {
        // Ambil semua data wali kelas
        $teachers = HomeroomTeacher::all();
        return response()->json($teachers);
    }
}
