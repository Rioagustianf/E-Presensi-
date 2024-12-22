<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomeroomController;
use App\Http\Controllers\Api\PermisiionController;
use App\Http\Controllers\Api\PresenceController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\UserController;
use Filament\Forms\Get;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'show']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/login/wali-kelas', [AuthController::class, 'loginWaliKelas']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/student', [StudentController::class, 'getStudent']);

Route::post('presensi', [PresenceController::class, 'store']);
Route::get('presences/{studentId}', [PresenceController::class, 'getStudentPresences']);

Route::post('/permission', [PermisiionController::class, 'store']);
Route::get('/permissions/{studentId}', [PermisiionController::class, 'getStudentPermissions']);

Route::get('/homeroom-teachers', [HomeroomController::class, 'getHomeroomTeachers']);
Route::get('/students/teacher/{teacherId}', [HomeroomController::class, 'getStudentsByTeacherId']);