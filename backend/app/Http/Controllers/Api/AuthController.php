<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use App\Http\Resources\Api\Student as StudentResource;
use App\Models\HomeroomTeacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
   /**
     * Register a new user and create a related student record.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function register(Request $request)
    {
        // Validasi data request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|confirmed|min:8',
            'nis' => 'required|string|unique:students,nis',
            'class' => 'required|string|max:255',
            'homeroom_teacher_id' => 'required|exists:homeroom_teacher,id',
        ]);

        // Jika validasi gagal, kembalikan response error
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Buat user baru
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Setelah user berhasil dibuat, buat record Student
        $student = Student::create([
            'user_id' => $user->id,  // Menyimpan user_id yang baru dibuat
            'nis' => $request->nis,  // NIS dari request
            'name' => $request->name, // Nama dari request
            'class' => $request->class, // Kelas dari request
            'homeroom_teacher_id' => $request->homeroom_teacher_id,
        ]);

        // Response dengan data user dan student
        return response()->json([
            'message' => 'User and student registered successfully',
            'user' => $user,
            'student' => new StudentResource($student)
        ], 201);
    }

    public function getHomeroomTeachers()
{
    // Ambil semua data wali kelas
    $teachers = HomeroomTeacher::all();
    return response()->json($teachers);
}

    /**
     * Fungsi untuk login pengguna
     */
    public function login(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8'
        ]);

        // Jika validasi gagal, kembalikan error
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Mencari pengguna berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Jika pengguna tidak ditemukan atau password salah
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Membuat token untuk autentikasi menggunakan Laravel Sanctum
        $token = $user->createToken('API Token')->plainTextToken;

        // Return response dengan token
        return response()->json([
            'message' => 'Login successful',
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function loginWaliKelas(Request $request)
{
    // Validasi input
    $validator = Validator::make($request->all(), [
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:8'
    ]);

    // Jika validasi gagal, kembalikan error
    if ($validator->fails()) {
        throw new ValidationException($validator);
    }

    // Mencari pengguna berdasarkan email
    $user = User::where('email', $request->email)->first();

    // Jika pengguna tidak ditemukan atau password salah
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    // Cek jika user adalah wali kelas
    if ($user->role !== 'wali_kelas') {
        return response()->json([
            'message' => 'You are not authorized to login as homeroom teacher'
        ], 403); // Unauthorized access
    }

    // Membuat token untuk autentikasi menggunakan Laravel Sanctum
    $token = $user->createToken('Wali Kelas Token')->plainTextToken;

    // Return response dengan token
    return response()->json([
        'message' => 'Wali Kelas Login successful',
        'token' => $token
    ]);
}
}
