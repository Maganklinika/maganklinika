<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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

}
