<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // Method untuk mendapatkan data student berdasarkan user yang login
    public function getStudent(Request $request)
    {
        // Mendapatkan student berdasarkan user_id (misalnya user yang sedang login)
        $userId = $request->user()->id;

        // Mencari student berdasarkan user_id
        $student = Student::where('user_id', $userId)->first();

        if (!$student) {
            return response()->json([
                'message' => 'Student not found.'
            ], 404);
        }

        return response()->json([
            'id' => $student->id,
            'nis' => $student->nis,
            'name' => $student->name,
            'class' => $student->class,
        ], 200);
    }
}
