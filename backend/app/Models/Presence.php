<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'check_in',
        'check_out',
        'photo',
        'latitude',
        'longitude',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
