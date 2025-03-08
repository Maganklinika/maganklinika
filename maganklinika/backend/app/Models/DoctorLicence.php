<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorLicence extends Model
{
    /** @use HasFactory<\Database\Factories\DoctorLicenceFactory> */
    use HasFactory;

    protected  $primaryKey = 'licence_id';

    protected $fillable = [
        'licence_number',
        'isUsed',
    ];
}
