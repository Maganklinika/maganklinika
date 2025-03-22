<?php

namespace App\Mail;

use App\Models\DoctorAppointment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppointmentStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment; // Az időpont információi
    public $status; // Az új státusz
    public $patient; // A páciens információi

    /**
     * Create a new message instance.
     */
    public function __construct(DoctorAppointment $appointment, string $status)
    {
        $this->appointment = $appointment;
        $this->status = $status;
        $user = User::find($appointment->patient_id);
        $this->patient = $user;
        
        
    }

    /**
     * Get the message envelope.
     */
    public function build()
    {
        return $this->subject('Időpont státusz változás')
            ->view('appointment-status-updated')
            ->with([
                'appointment' => $this->appointment,
                'status' => $this->status,
                'patient' => $this->patient,
            ]);
    }
}
