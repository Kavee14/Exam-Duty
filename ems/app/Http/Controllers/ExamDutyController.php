<?php

namespace App\Http\Controllers;

use App\Models\Duty;
use Illuminate\Http\Request;

class ExamDutyController extends Controller
{
    // Get all exam duties
    public function index()
    {
        try {
            $examDuties = Duty::with('lecturers')->get();

            return response()->json([
                'status' => true,
                'data' => $examDuties
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve exam duties'
            ], 500);
        }
    }

    // Get specific exam duty
    public function show($duty_id)
    {
        try {
            $examDuty = Duty::with('lecturers')->findOrFail($duty_id);

            return response()->json([
                'status' => true,
                'data' => $examDuty
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Exam duty not found'
            ], 404);
        }
    }

    // Add new exam duty
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'lec_id' => 'required|exists:lecturers,lec_id',
                'course_code' => 'required|string',
                'duty_date' => 'required|date',
                'start_time' => 'required|date_format:H:i',
                'end_time' => 'required|date_format:H:i|after:start_time',
                'exam_hall' => 'required|string'
            ]);

            // Check if lecturer is already assigned at this time
            $existingDuty = Duty::where('lec_id', $validated['lec_id'])
                ->where('duty_date', $validated['duty_date'])
                ->where(function ($query) use ($validated) {
                    $query->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                        ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']]);
                })->first();

            if ($existingDuty) {
                return response()->json([
                    'status' => false,
                    'message' => 'Lecturers already has a duty during this time'
                ], 422);
            }

            $examDuty = Duty::create($validated);

            return response()->json([
                'status' => true,
                'message' => 'Exam duty assigned successfully',
                'data' => $examDuty
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }
    }

    // Update exam duty
    public function update(Request $request, $duty_id)
    {
        try {
            $examDuty = Duty::findOrFail($duty_id);

            $validated = $request->validate([
                'lec_id' => 'sometimes|required|exists:lecturers,lec_id',
                'course_code' => 'sometimes|required|string',
                'duty_date' => 'sometimes|required|date',
                'start_time' => 'sometimes|required|date_format:H:i',
                'end_time' => 'sometimes|required|date_format:H:i|after:start_time',
                'exam_hall' => 'sometimes|required|string'
            ]);

            // Check for time conflicts if date or time is being updated
            if (isset($validated['duty_date']) || isset($validated['start_time']) || isset($validated['end_time'])) {
                $lec_id = $validated['lec_id'] ?? $examDuty->lec_id;
                $date = $validated['duty_date'] ?? $examDuty->duty_date;
                $start_time = $validated['start_time'] ?? $examDuty->start_time;
                $end_time = $validated['end_time'] ?? $examDuty->end_time;

                $existingDuty = Duty::where('lec_id', $lec_id)
                    ->where('duty_date', $duty_date)
                    ->where('duty_id', '!=', $duty_id)
                    ->where(function ($query) use ($start_time, $end_time) {
                        $query->whereBetween('start_time', [$start_time, $end_time])
                            ->orWhereBetween('end_time', [$start_time, $end_time]);
                    })->first();

                if ($existingDuty) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Lecturers already has a duty during this time'
                    ], 422);
                }
            }

            $examDuty->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'Exam duty updated successfully',
                'data' => $examDuty
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Exam duty not found'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }
    }

    // Delete exam duty
    public function destroy($duty_id)
    {
        try {
            $examDuty = Duty::findOrFail($duty_id);
            $examDuty->delete();

            return response()->json([
                'status' => true,
                'message' => 'Exam duty deleted successfully'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Exam duty not found'
            ], 404);
        }
    }
}
