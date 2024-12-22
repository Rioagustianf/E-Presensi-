<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeroomTeacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        
    ];

    // Menetapkan nama tabel secara eksplisit
    protected $table = 'homeroom_teacher'; 

    /**
     * Relasi ke model Student
     */
    public function students()
    {
        return $this->hasMany(Student::class, 'homeroom_teacher_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
