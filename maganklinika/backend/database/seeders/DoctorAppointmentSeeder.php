<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Doctor;
use App\Models\Treatment;
use App\Models\Patient;
use App\Models\DoctorAppointment;

class DoctorAppointmentSeeder extends Seeder
{
    public function run()
    {
        $doctors = Doctor::with('specialization.treatments')->get();
        $patients = Patient::pluck('user_id')->toArray();

        $startDate = Carbon::now()->startOfDay();
        $endDate = Carbon::now()->addMonth()->startOfDay(); // Csak 1 hónapra előre

        $scheduledDays = []; // [specialization_id][date] => treatment_id
        $weeklyScheduleCount = []; // [doctor_id][weekNumber] => count

        foreach ($doctors as $doctor) {
            $specialization = $doctor->specialization;

            if (!$specialization || $specialization->treatments->isEmpty()) {
                continue;
            }

            $treatments = $specialization->treatments;
            $currentDate = $startDate->copy();

            while ($currentDate->lte($endDate)) {
                if ($currentDate->isWeekday()) {
                    $week = $currentDate->format('W');
                    $alreadyScheduled = $weeklyScheduleCount[$doctor->user_id][$week] ?? 0;
                    $dayKey = $currentDate->format('Y-m-d');

                    if ($alreadyScheduled < 2) {
                        // Válassz random kezelést
                        $treatment = $treatments->random();

                        // Ha ezen a napon már volt ugyanez a kezelés másik orvossal, hagyjuk ki
                        if (!empty($scheduledDays[$specialization->specialization_id][$dayKey]) &&
                            in_array($treatment->treatment_id, $scheduledDays[$specialization->specialization_id][$dayKey])) {
                            $currentDate->addDay();
                            continue;
                        }

                        $weeklyScheduleCount[$doctor->user_id][$week] = $alreadyScheduled + 1;
                        $scheduledDays[$specialization->specialization_id][$dayKey][] = $treatment->treatment_id;

                        // Műszak
                        $shift = rand(0, 1) === 0
                            ? ['start' => '07:00', 'end' => '14:00']
                            : ['start' => '13:00', 'end' => '18:00'];

                        $start = Carbon::parse($currentDate->format('Y-m-d') . ' ' . $shift['start']);
                        $end = Carbon::parse($currentDate->format('Y-m-d') . ' ' . $shift['end']);

                        $length = Carbon::parse($treatment->treatment_length);
                        $duration = $length->hour * 60 + $length->minute;

                        $appointments = [];
                        $currentStart = $start->copy();

                        while ($currentStart->addMinutes($duration)->lte($end)) {
                            $appointments[] = [
                                'doctor_id' => $doctor->user_id,
                                'start_time' => $currentStart->copy()->subMinutes($duration),
                                'treatment_id' => $treatment->treatment_id,
                                'patient_id' => null,
                                'status' => 'v',
                                'created_at' => now(),
                                'updated_at' => now(),
                            ];
                            $currentStart->addMinutes(10); // 10 perc "szünet"
                        }

                        DoctorAppointment::insert($appointments);
                    }
                }

                $currentDate->addDay();
            }

            // Egy elvégzett kezelés minden orvoshoz
            $treatmentDone = $treatments->random();
            $lengthDone = Carbon::parse($treatmentDone->treatment_length);
            $durationDone = $lengthDone->hour * 60 + $lengthDone->minute;

            $startTime = now()->subDays(rand(1, 30))->setTime(rand(8, 15), rand(0, 59));
            $endTime = $startTime->copy()->addMinutes($durationDone);

            DoctorAppointment::create([
                'doctor_id' => $doctor->user_id,
                'start_time' => $startTime,
                'treatment_id' => $treatmentDone->treatment_id,
                'patient_id' => $patients[array_rand($patients)],
                'status' => 'd',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
