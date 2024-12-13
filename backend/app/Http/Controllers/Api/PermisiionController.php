<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermisiionController extends Controller
{
    /**
     * Display a listing of the permissions.
     */
    public function index()
    {
        $permissions = Permission::with('student', 'admin')->get();
        return response()->json($permissions, 200);
    }

    /**
     * Store a newly created permission in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'reason' => 'required|string',
            'document' => 'required|file|mimes:pdf,jpeg,png', // Atur jenis file yang diperbolehkan
            'status' => 'required|string',
        ]);
    
        // Menyimpan file dengan nama yang unik
        $document = $request->file('document');
        $documentName = Str::random(15) . '.' . $document->getClientOriginalExtension();
        $documentPath = $document->storeAs('permissions', $documentName, 'public');
    
        $permission = Permission::create([
            'student_id' => $request->student_id,
            'reason' => $request->reason,
            'document' => $documentName,  // Menyimpan nama file yang diubah
            'status' => $request->status,
        ]);
    
        return response()->json($permission, 201);
    }

    /**
     * Display the specified permission.
     */
    public function show($id)
    {
        $permission = Permission::with('student', 'admin')->find($id);

        if (!$permission) {
            return response()->json(['message' => 'Permission not found'], 404);
        }

        return response()->json($permission, 200);
    }

    /**
     * Update the specified permission in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'sometimes|exists:students,id',
            'reason' => 'sometimes|string',
            'document' => 'sometimes|string',
            'status' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permission = Permission::find($id);

        if (!$permission) {
            return response()->json(['message' => 'Permission not found'], 404);
        }

        $permission->update($request->all());

        return response()->json($permission, 200);
    }

    /**
     * Remove the specified permission from storage.
     */
    public function destroy($id)
    {
        $permission = Permission::find($id);

        if (!$permission) {
            return response()->json(['message' => 'Permission not found'], 404);
        }

        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully'], 200);
    }
}
