<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class Presence extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'check_in' => $this->check_in,
            'check_out' => $this->check_out,
            'photo' => Storage::url($this->photo), // Menyertakan URL foto yang diunggah
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'status' => $this->status,
        ];
    }
}
