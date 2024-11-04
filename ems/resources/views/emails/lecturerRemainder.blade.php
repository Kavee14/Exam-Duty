<?php
public function handle()
{
    // Fetch duties scheduled for the next day
    $duties = Duty::whereDate('duty_date', '=', now()->addDay()->toDateString())->get();

    foreach ($duties as $duty) {
        // Prepare lecturer details for email
        $details = [
            'name' => $duty->name,
            'duty_date' => Carbon::parse($duty->duty_date)->format('d M Y'),
            'course_code' => $duty->course_code,
            'start_time' => Carbon::parse($duty->start_time)->format('H:i'),
            'end_time' => Carbon::parse($duty->end_time)->format('H:i'),
            'exam_hall' => $duty->exam_hall,
        ];

        // Send email
        Mail::to($duty->email)->send(new \App\Mail\LecturerReminderMail($details));
    }

    $this->info('Lecturers notified successfully.');
}

