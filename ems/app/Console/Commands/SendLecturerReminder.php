<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Duty; // Assuming you have a Duty model for the scheduled duties
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Dompdf\Options;

class SendLecturerReminder extends Command
{
    protected $signature = 'email:send-lecturer-reminder';
    protected $description = 'Send email reminders to lecturers the day before the duty date and generate a PDF reminder';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $tomorrow = Carbon::tomorrow();

        // Fetch duty scheduled for tomorrow
        $duty = Duty::whereDate('duty_date', $tomorrow)->get();

        if ($duty->isEmpty()) {
            $this->info('No duty scheduled for tomorrow.');
            return;
        }

        // Generate PDF reminders
        $this->generatePdf($duty, $tomorrow);

        foreach ($duty as $duty) {
            $lecturerEmail = $duty->lecturer->email; // Adjust based on your model relationships
            $details = [
                'subject' => 'Duty Reminder',
                'body' => "You have a scheduled duty tomorrow at {$duty->location} from {$duty->start_time} to {$duty->end_time}."
            ];

            // Send email
            Mail::send([], [], function ($message) use ($lecturerEmail, $details) {
                $message->to($lecturerEmail)
                    ->subject($details['subject'])
                    ->setBody($details['body'], 'text/html');
            });
        }

        $this->info('Lecturers reminders sent successfully!');
    }

    protected function generatePdf($duties, $date)
    {
        // Initialize Dompdf
        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf = new Dompdf($options);

        // Create PDF content
        $html = '<h1>Duty Reminders for ' . $date->toFormattedDateString() . '</h1>';
        foreach ($duties as $duty) {
            $html .= '<p>You have a scheduled duty tomorrow at ' . $duty->location .
                ' from ' . $duty->start_time . ' to ' . $duty->end_time . '.</p>';
        }

        // Load HTML to Dompdf
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait'); // Set paper size
        $dompdf->render();

        // Output the generated PDF to Browser
        $dompdf->stream('duty_reminders.pdf', ['Attachment' => true]);

        $this->info('PDF generated successfully!');
    }
}
