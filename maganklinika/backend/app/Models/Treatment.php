<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    /** @use HasFactory<\Database\Factories\TreatmentFactory> */
    use HasFactory;

    protected  $primaryKey = 'treatment_id';

    protected $fillable = [
        'specialization_id',
        'treatment_name',
        'treatment_length',
        'price',
    ];

    public function appointments()
    {
        return $this->hasMany(DoctorAppointment::class, 'treatment_id', 'treatment_id');
    }

    public function specialization()
    {
        return $this->belongsTo(Specialization::class, 'specialization_id', 'specialization_id');
    }
}
