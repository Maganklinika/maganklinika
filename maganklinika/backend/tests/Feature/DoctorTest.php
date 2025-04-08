<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\TestCaseWithSeed;

class DoctorTest extends TestCaseWithSeed
{
    /**
     * A basic feature test example.
     */
    public function test_listDoctorsWithSpecialization(): void
    {
        $patient = User::factory()->create([
            'role_id' => 3,
        ]);

        $response = $this->actingAs($patient)->get('/api/doctors-with-spec');


        $response->assertStatus(200);
    }
}
