<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DutyController;




Route::get('/', function () {
    return view('welcome');
});


Route::get('/upcoming-duties/{lec_id}', [DutyController::class, 'getUpcomingDuties']);
Route::get('/lecturer-duty-schedule/{lec_id}', [DutyController::class, 'downloadLecturerDutySchedule']);
Route::get('/duties/download', [DutyController::class, 'downloadDutySchedule'])->name('duties.download');
Route::get('/duties', function () {
    return view('duties.index');
});

Route::get('/duties/download/{lecturerId}', [DutyController::class, 'downloadLecturerDutySchedule'])->name('duties.download.lecturer');

//Route::post('/duties/{id}/request', [DutyController::class, 'requestDutyChange'])->name('duties.request');
//Route::get('/duties/{id}', [DutyController::class, 'show'])->name('duties.show');
/*Route::get('/send-test-email', function () {
    Mail::raw('This is a test email.', function ($message) {
        $message->to('bmldiluka123@gmail.com')
            ->subject('Test Email');
    });
    return 'Test email sent!';
});*/
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth:sanctum'])->get('/api/duties/lecturer/duty-dates', [DutyController::class, 'getDutyDatesForLecturer']);
