<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorAppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctorIds = DB::table('doctors')->pluck('user_id')->toArray();

        $patientIds = DB::table('patients')->pluck('user_id')->toArray();

        $treatmentIds = DB::table('treatments')->pluck('treatment_id')->toArray();

        $statuses = ['b', 'p', 'd', 'c', 'v'];

        for ($i = 0; $i < 10; $i++) {
            DB::table('doctor_appointments')->insert([
                'doctor_id' => $doctorIds[array_rand($doctorIds)],
                'start_time' => now()->subDays(rand(1, 30))->setTime(rand(8, 17), rand(0, 59), 0),
                'patient_id' => $patientIds[array_rand($patientIds)],
                'treatment_id' => $treatmentIds[array_rand($treatmentIds)],
                'description' => "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo repellendus tempore fugit praesentium quis repellat, eos cum cupiditate quibusdam earum consequatur ducimus omnis recusandae voluptatibus harum soluta numquam ex iste.",
                'status' => $statuses[array_rand($statuses)],
                'rating' => rand(1, 5),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
