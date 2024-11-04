<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Duty extends Model
{
    use HasFactory;

    protected $table = 'duty';

    protected $fillable = [
        'duty_date',
        'course_code',
        'start_time',
        'end_time',
        'exam_hall',
        'lec_id',
    ];

    protected $casts = [
        'duty_date' => 'date',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function lecturers()
    {
        return $this->belongsTo(Lecturers::class, 'lec_id', 'lec_id');
    }
}
