<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\TestCaseWithSeed;

class SpecializationTest extends TestCaseWithSeed
{
    /**
     * A basic feature test example.
     */
    public function test_getSpecializations(): void
    {
        
        $response = $this->withoutMiddleware()->get("/api/specializations");

        $response->assertStatus(200);
    }

    public function test_getTreatmentBySpec(): void
    {

        $patient = User::factory()->create([
            'role_id' => 3,
        ]);

        
        $response = $this->actingAs($patient)->get("/api/test-get-tbs");

        $response->assertStatus(200);
    }

    
    
}
