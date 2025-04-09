<?php

namespace Tests\Feature;

use App\Models\Doctor;
use App\Models\DoctorAppointment;
use App\Models\Patient;
use App\Models\Treatment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;
use Tests\TestCaseWithSeed;

class PatientTest extends TestCaseWithSeed
{
    /**
     * A basic feature test example.
     */
    public function test_getAllPatientsWithName(): void
    {
        $doctor = User::factory()->create([
            'role_id' => 2,
        ]);

        $response = $this->actingAs($doctor)->get('/api/get-all-patients-with-name');

        $response->assertStatus(200);
    }

    public function test_getPatientsToAuthDoctor(): void
    {
        $doctor = User::factory()->create([
            'role_id' => 2,
        ]);

        $response = $this->actingAs($doctor)->get('/api/get-patients-to-auth-doctor');

        $response->assertStatus(200);
    }

    public function test_getPatientData(): void
    {
        $doctor = User::factory()->create([
            'role_id' => 2,
        ]);

        $response = $this->actingAs($doctor)->get("/api/get-patient-data/{$doctor->id}");

        $response->assertStatus(200);
    }

    public function test_cancelAppointmentByPatient(): void
    {
        Mail::fake();
        $patientModel = Patient::firstOrFail();
        $user = User::findOrFail($patientModel->user_id);

        $doctor = Doctor::firstOrFail();
        $treatment = Treatment::where('specialization_id', $doctor->specialization_id)->firstOrFail();

        // Létrehozunk egy lefoglalt időpontot
        $appointment = DoctorAppointment::create([
            'doctor_id' => $doctor->user_id,
            'start_time' => now()->addDays(3)->setTime(10, 0),
            'patient_id' => $user->id,
            'treatment_id' => $treatment->treatment_id,
            'status' => 'b',
            'description' => null,
            'rating' => null,
        ]);

        $response = $this->actingAs($user)->put("/api/cancel-appointment-by-patient/{$appointment->id}");

        $response->assertStatus(200);

        $this->assertEquals('v', $appointment->fresh()->status);
    }

    public function test_failToCancelAppointmentByPatient(): void
    {
        Mail::fake();
        $patientModel = Patient::firstOrFail();
        $user = User::findOrFail($patientModel->user_id);

        $doctor = Doctor::firstOrFail();
        $treatment = Treatment::where('specialization_id', $doctor->specialization_id)->firstOrFail();

        // Létrehozunk egy lefoglalt időpontot
        $appointment = DoctorAppointment::create([
            'doctor_id' => $doctor->user_id,
            'start_time' => now()->addDays(3)->setTime(10, 0),
            'patient_id' => $user->id,
            'treatment_id' => $treatment->treatment_id,
            'status' => 'd',
            'description' => null,
            'rating' => null,
        ]);

        $response = $this->actingAs($user)->put("/api/cancel-appointment-by-patient/{$appointment->id}");

        $response->assertStatus(400);

        $this->assertEquals('d', $appointment->fresh()->status);
    }
}
