<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    /** @use HasFactory<\Database\Factories\PatientFactory> */
    use HasFactory;

    protected  $primaryKey = 'user_id';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'taj_number',
        'birth_date',
        'address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(DoctorAppointment::class, 'patient_id', 'user_id');
    }
}
