<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class TestScheduleCommand extends Command
{
    protected $signature = 'app:test-schedule-command';
    protected $description = 'A test command for scheduling.';

    public function handle()
    {
        $this->info('Test command executed.');
        // You can also log this to a file for further verification
        \Log::info('Test command executed.');
    }
}

