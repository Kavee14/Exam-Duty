<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Duty;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth; // Added Auth facade
use Illuminate\Http\JsonResponse;

class DutyController extends Controller
{
    /**
     * Get upcoming duties for a lecturer
     * 
     * @param string $lec_id
     * @return JsonResponse
     */
    public function getUpcomingDuties($lec_id): JsonResponse
    {
        try {
            $today = Carbon::today();

            $duties = Duty::where('lec_id', $lec_id)
                ->where('duty_date', '>=', $today)
                ->orderBy('duty_date')
                ->orderBy('start_time')
                ->take(2)
                ->get(['duty_date', 'start_time', 'end_time', 'course_code', 'exam_hall']);

            $formattedDuties = $duties->map(function ($duty) {
                return [
                    'duty_date' => Carbon::parse($duty->duty_date)->format('Y-m-d'),
                    'time' => Carbon::parse($duty->start_time)->format('H:i') . '-' . 
                             Carbon::parse($duty->end_time)->format('H:i'),
                    'course_code' => $duty->course_code,
                    'exam_hall' => $duty->exam_hall,
                ];
            });

            return response()->json($formattedDuties);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch upcoming duties',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Download lecturer duty schedule as PDF
     * 
     * @param string $lec_id
     * @return mixed
     */
    public function downloadLecturerDutySchedule($lec_id)
    {
        try {
            $duties = Duty::where('lec_id', $lec_id)
                ->orderBy('duty_date')
                ->orderBy('start_time')
                ->get();

            if ($duties->isEmpty()) {
                return response()->json([
                    'error' => 'No duties found for this lecturer'
                ], 404);
            }

            if (!View::exists('duties.schedule')) {
                return response()->json([
                    'error' => 'PDF template not found'
                ], 404);
            }

            $pdf = Pdf::loadView('duties.schedule', compact('duties'));
            return $pdf->download('Lecturer_Duty_Schedule_' . $lec_id . '.pdf');

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate PDF',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get duty dates for authenticated lecturer
     * 
     * @return JsonResponse
     */
    public function getDutyDatesForLecturer(): JsonResponse
    {
        try {
            if (!Auth::check()) {
                return response()->json([
                    'error' => 'User not authenticated'
                ], 401);
            }

            $lecturerId = Auth::user()->lec_id;
            
            if (!$lecturerId) {
                return response()->json([
                    'error' => 'Lecturer ID not found in user profile'
                ], 404);
            }

            $dutyDates = Duty::where('lec_id', $lecturerId)
                ->orderBy('duty_date')
                ->pluck('duty_date')
                ->map(function ($date) {
                    return Carbon::parse($date)->format('Y-m-d');
                });

            return response()->json([
                'success' => true,
                'dates' => $dutyDates
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch duty dates',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}