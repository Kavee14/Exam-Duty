//<?php

/*namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Duty;

class DutySeeder extends Seeder
{
    public function run()
    {
        Duty::create([
            'duty_date' => '2024-05-09',
            'course_code' => 'COM313',
            'course_name' => 'Computer Science',
            'start_time' => '09:00:00',
            'end_time' => '11:00:00',
            'exam_hall' => 'Auditorium'
        ]);

        Duty::create([
            'duty_date' => '2024-05-09',
            'course_code' => 'MAT101',
            'course_name' => 'Mathematics 101',
            'start_time' => '13:00:00',
            'end_time' => '15:00:00',
            'exam_hall' => 'Room 203'
        ]);
    }
}
