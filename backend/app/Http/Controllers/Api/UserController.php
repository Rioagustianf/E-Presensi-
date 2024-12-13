<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(Request $request)
    {
        // Mendapatkan pengguna yang terautentikasi
        $user = auth()->user();

        // Cek jika pengguna tidak ada (belum login atau token tidak valid)
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401); // Mengembalikan status 401 Unauthorized dalam format JSON
        }

        return response()->json($user); // Mengembalikan data pengguna dalam format JSON
    }
}
