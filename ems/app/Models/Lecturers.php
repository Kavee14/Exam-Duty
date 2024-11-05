<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecturers extends Model
{
    use HasFactory;

    protected $table = 'lecturers';

    protected $fillable = [
        'lec_id',
        'name',
        'email',
        'phone',
        'address',
        'position',
        'department',
    ];

    protected $primaryKey = 'lec_id';
    public $incrementing = false;
    protected $keyType = 'string';
}
