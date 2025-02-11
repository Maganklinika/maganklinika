<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specialization extends Model
{
    /** @use HasFactory<\Database\Factories\SpecializationFactory> */
    use HasFactory;

    protected  $primaryKey = 'specialization_id';

    protected $fillable = [
        'specialization_name',
    ];

    public function doctors()
    {
        return $this->hasMany(Doctor::class, 'specialization_id', 'specialization_id');
    }

    public function treatments()
    {
        return $this->hasMany(Treatment::class, 'specialization_id', 'specialization_id');
    }
}
