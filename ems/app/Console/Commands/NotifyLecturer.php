<?php

namespace App\Console\Commands;

use App\Models\Duty;
use App\Mail\DutyReminder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class NotifyLecturer extends Command
{
    protected $signature = 'app:notify-lecturer';
    protected $description = 'Send email notifications to lecturers for upcoming duties';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');
        $duties = Duty::whereDate('duty_date', $tomorrow)->get();
        Log::info('Notify lecturer command executed at ' . now());

        if ($duties->isEmpty()) {
            Log::info('No duty found for tomorrow.');
            return $this->info('No duty to notify for tomorrow.');
        }

        foreach ($duties as $duty) {
            // Access the lecturer's email through the relationship
            $email = $duty->lecturer->email ?? null;
            Log::info('Attempting to send email to: ' . $email);

            if ($email) {
                try {
                    Mail::to($email)->send(new DutyReminder($duty));
                    Log::info('Email sent to ' . $email);
                } catch (\Exception $e) {
                    Log::error('Failed to send email to ' . $email . ': ' . $e->getMessage());
                }
            } else {
                Log::warning('No email address found for duty ID: ' . $duty->id);
            }
        }

        $this->info('Lecturers notified successfully.');
    }

}
