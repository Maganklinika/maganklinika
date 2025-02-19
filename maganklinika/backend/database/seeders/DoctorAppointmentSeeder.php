<?php

namespace Database\Seeders;

use App\Models\DoctorAppointment;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoctorAppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Lekérjük az összes orvos user_id-ját a doctors táblából
        $doctorIds = DB::table('doctors')->pluck('user_id')->toArray();

        // Lekérjük az összes beteg user_id-ját a patients táblából
        $patientIds = DB::table('patients')->pluck('user_id')->toArray();

        // Lekérjük az összes treatment_id-t a treatments táblából
        $treatmentIds = DB::table('treatments')->pluck('treatment_id')->toArray();

        // Lehetséges státuszok
        $statuses = ['b', 'p', 'd', 'c', 'v'];

        for ($i = 0; $i < 10; $i++) {
            DB::table('doctor_appointments')->insert([
                'doctor_id' => $doctorIds[array_rand($doctorIds)], // Doctors táblából a user_id alapján
                'start_time' => now()->subDays(rand(1, 30))->setTime(rand(8, 17), rand(0, 59), 0),
                'patient_id' => $patientIds[array_rand($patientIds)], // Patients táblából a user_id alapján
                'treatment_id' => $treatmentIds[array_rand($treatmentIds)],
                'status' => $statuses[array_rand($statuses)],
                'rating' => rand(1, 5),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
