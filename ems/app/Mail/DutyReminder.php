<?php

namespace App\Mail;

use App\Models\Duty;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DutyReminder extends Mailable
{
    use Queueable, SerializesModels;

    protected $duty;
    protected $lecturers;

    public function __construct(Duty $duty)
    {
        $this->duty = $duty;
        $this->lecturers = $duty->lecturers;
    }

    public function build()
    {
        return $this->subject('Reminder: Upcoming Duty Assigned')
            ->view('emails.dutyReminder')
            ->with([
                'duty' => $this->duty,
                'lecturers' => $this->lecturers,
            ]);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Duty Reminder',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
