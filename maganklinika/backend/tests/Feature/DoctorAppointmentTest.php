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

class DoctorAppointmentTest extends TestCaseWithSeed
{
    /**
     * A basic feature test example.
     */
    public function test_getAvailableAppointmentsByTreatment(): void
    {
        $treatment = Treatment::first()->treatment_id;
        $response = $this->withoutMiddleware()->get("/api/get-available-appointments?treatment_id=$treatment");

        $response->assertStatus(200);
    }

    public function test_getAppointmentByDoctor(): void
    {
        $patient = User::first();
        $doctorid = Doctor::first()->user_id;
        $response = $this->actingAs($patient)->get("/api/get-appointments-by-doctor?doctor_id=$doctorid");

        $response->assertStatus(200);
    }

    public function test_getAllAppointmentByDoctor(): void
    {
        $patient = User::first();
        $doctorid = Doctor::first()->user_id;
        $response = $this->actingAs($patient)->get("/api/get-all-appointment-by-doctor?doctor_id=$doctorid");

        $response->assertStatus(200);
    }

    public function test_createAppointments(): void
    {
        $doctor = Doctor::first();
        $specializationId = $doctor->specialization_id;
        $treatment = Treatment::where('specialization_id', $specializationId)->first();
        $response = $this->actingAs(User::find($doctor->user_id))->post(
            "/api/create-appointments",
            [
                'treatment_name' => $treatment->treatment_name,
                'start_time' => '2025-10-10 08:00:00',
                'end_time' => '2025-10-10 18:00:00'
            ]
        );

        $response->assertStatus(200);
    }

    public function test_getAppointmentsCount(): void
    {
        $doctor = Doctor::first();
        $response = $this->actingAs(User::find($doctor->user_id))->get("/api/get-appointments-count");

        $response->assertStatus(200);
    }

    public function test_getAppointmentsByPatients(): void
    {
        $patient = Patient::first();
        $response = $this->actingAs(User::find($patient->user_id))->get("/api/get-appointments-by-patients/{$patient->user_id}");

        $response->assertStatus(200);
    }

    public function test_bookingAppointment(): void
    {
        $patient = Patient::first();

        $appiontment = DoctorAppointment::where('status', 'v')->first();


        $response = $this->actingAs(User::find($patient->user_id))->put("/api/booking-appointment/{$appiontment->id}");
        $response->assertStatus(200);
    }

    public function test_failBookingAppointment(): void
    {
        $patient = Patient::first();

        $appiontment = DoctorAppointment::where('status', 'd')->first();


        $response = $this->actingAs(User::find($patient->user_id))->put("/api/booking-appointment/{$appiontment->id}");
        $response->assertStatus(400);
    }


    public function test_getTodayAppointments(): void
    {
        $doctor = Doctor::first();
        $response = $this->actingAs(User::find($doctor->user_id))->get("/api/get-today-appointments/{$doctor->user_id}");

        $response->assertStatus(200);
    }

    public function test_finishAppointment(): void
    {
        //Mail::fake();

        $doctor = Doctor::first();

        $patient = Patient::first();

        $treatment = $treatment = Treatment::where('specialization_id', $doctor->specialization_id)->first();
        $appointment = DoctorAppointment::create([
            'doctor_id' => $doctor->user_id,
            'start_time' => '2026-01-01 10:00:00',
            'patient_id' => $patient->user_id,
            'treatment_id' => $treatment->treatment_id,
            'status' => 'b',  
        ]);


        $response = $this->actingAs(User::find($doctor->user_id))->put("/api/finish-appointment/{$appointment->id}", ['description' => "Bla bla bla"]);
        $response->assertStatus(200);
    }
}
