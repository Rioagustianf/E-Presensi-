<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Presence as PresenceResource;
use App\Models\Presence;
use App\Models\Student;
use Illuminate\Http\Request;

class PresenceController extends Controller
{
    // Method to store the presence
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id'  => 'required|exists:students,id',
            'check_in'    => 'required|date',
            'check_out'   => 'required|date',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5000',
            'latitude'    => 'required|string',
            'longitude'   => 'required|string',
            'status'      => 'required|in:hadir,tidak_hadir,izin',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('presences', 'public');
        } else {
            $path = null;
        }

        // Create a new presence record
        $presensi = new Presence();
        $presensi->student_id = $validated['student_id'];
        $presensi->check_in = $validated['check_in'];
        $presensi->check_out = $validated['check_out'];
        $presensi->photo = $path;
        $presensi->latitude = $validated['latitude'];
        $presensi->longitude = $validated['longitude'];
        $presensi->status = $validated['status'];
        $presensi->save();

        return response()->json([
            'message' => 'Presensi berhasil dicatat!',
            'data' => new PresenceResource($presensi)
        ], 201);
    }

    /**
     * Get all presence records for a specific student.
     *
     * @param  int $studentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStudentPresences($studentId)
    {
        // Check if the student exists
        $student = Student::find($studentId);

        if (!$student) {
            return response()->json([
                'message' => 'Siswa tidak ditemukan.'
            ], 404);
        }

        // Get all presence records for the student
        $presences = Presence::where('student_id', $studentId)->get();

        return response()->json([
            'presences' => PresenceResource::collection($presences),
        ]);
    }
}

