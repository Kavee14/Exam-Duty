<?php

use App\Http\Controllers\ExamDutyController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DutyController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route to fetch duties by date
Route::get('/getDuties', [DutyController::class, 'getDutiesByDate']);

Route::post('login', [UserController::class, 'login']);


Route::prefix('v1')->group(function () {
    Route::get('lecturers/getAll', [LecturerController::class, 'index']);
    Route::post('lecturers/add', [LecturerController::class, 'store']);
    Route::put('lecturers/edit/{lec_id}', [LecturerController::class, 'update']);
    Route::delete('lecturers/{lec_id}', [LecturerController::class, 'destroy']);
    Route::get('lecturers/get/{lec_id}', [LecturerController::class, 'show']);

    Route::get('exam-duties/getAll', [ExamDutyController::class, 'index']);
    Route::get('exam-duties/{lec_id}', [ExamDutyController::class, 'show']);
    Route::post('exam-duties/add', [ExamDutyController::class, 'store']);
    Route::put('exam-duties/edit/{duty_id}', [ExamDutyController::class, 'update']);
    Route::delete('exam-duties/{duty_id}', [ExamDutyController::class, 'destroy']);

//    Route::get('/upcoming-duties/{lec_id}', [DutyController::class, 'getUpcomingDuties']);
//    Route::get('upcoming-duties/{lec_id}', [DutyController::class, 'getUpcomingDuties']);

});
