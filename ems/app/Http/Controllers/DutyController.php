<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Duty;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;
//use Barryvdh\Snappy\Facades\SnappyPdf as Pdf;


class DutyController extends Controller
{
    public function getUpcomingDuties($lec_id)
    {
        $today = Carbon::today();

        $duties = Duty::where('lec_id', $lec_id)
            ->where('duty_date', '>=', $today)
            ->orderBy('duty_date')
            ->orderBy('start_time')
            ->take(2)
            ->get(['duty_date', 'start_time', 'end_time', 'course_code', 'exam_hall']);

        // Format the duty date and times
        $formattedDuties = $duties->map(function ($duty) {
            return [
                'duty_date' => (new Carbon($duty->duty_date))->format('Y-m-d'), // Format duty_date to 'Y-m-d'
                'time' => (new Carbon($duty->start_time))->format('H:i') . '-' . (new Carbon($duty->end_time))->format('H:i'), // Format the time to 24-hour format
                'course_code' => $duty->course_code,
                'exam_hall' => $duty->exam_hall,
            ];
        });

        return response()->json($formattedDuties);
    }



    public function downloadLecturerDutySchedule($lec_id)
    {
        // Fetch the duty schedule data for the specific lecturer
        $duties = Duty::where('lec_id', $lec_id)->get();

        // Check if the view exists and load it
        if (View::exists('duties.schedule')) {
            $pdf = Pdf::loadView('duties.schedule', compact('duties'));
            return $pdf->download('Lecturer_Duty_Schedule.pdf');
        }

        // Handle the error case (view not found)
        return response()->json(['error' => 'View not found'], 404);
    }

    public function getDutyDatesForLecturer()
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $lecturerId = Auth::user()->lec_id;
        $dutyDates = Duty::where('lec_id', $lecturerId)->pluck('duty_date');

        return response()->json($dutyDates);
    }

}
