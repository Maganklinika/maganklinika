<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DoctorRatingsViewTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_getAVGRatingsByDoctors(): void
    {
        $response = $this->withoutMiddleware()->get('/api/get-avg-ratings-by-doctors');

        $response->assertStatus(200);
    }
}
