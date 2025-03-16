<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorAppointment extends Model
{
    /** @use HasFactory<\Database\Factories\DoctorAppointmentFactory> */
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'start_time',
        'taj_number',
        'treatment_id',
        'status',
        'rating'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id', 'user_id'); // Feltételezve, hogy a doctor_id a users.id-ra mutat
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'taj_number', 'taj_number'); // Hivatkozás a patients.taj_number mezőjére
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class, 'treatment_id', 'treatment_id'); // Kapcsolódás a treatments táblához
    }
}
