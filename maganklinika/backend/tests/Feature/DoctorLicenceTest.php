<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Tests\TestCaseWithSeed;

class DoctorLicenceTest extends TestCaseWithSeed
{
    /**
     * A basic feature test example.
     */
    public function test_doctorCanRegisterWithUnusedLicence(): void
    {
        $licence = 123456789;
        DB::table('doctor_licences')->insert([
            ['licence_number' => $licence, 'isUsed' => 0],
        ]);

        $response = $this->withoutMiddleware()->get("/api/checkLicenceById/{$licence}");

        $response->assertJson([
            'statusText' => 'OK',
        ]);

        $response->assertStatus(200);
    }

    public function test_doctorCanRegisterWithUsedLicence(): void
    {
        $licence = 123456789;

        $response = $this->withoutMiddleware()->get("/api/checkLicenceById/{$licence}");

        $response->assertJson([
            'statusText' => 'NOK',
        ]);

        $response->assertStatus(200);
    }
}
