<?php

namespace Database\Seeders;

use App\Models\DoctorLicence;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DoctorLicenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DoctorLicence::factory(10)->create();
    }
}
