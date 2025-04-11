<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TreatmentTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_getTreatments(): void
    {

        $response = $this->withoutMiddleware()->get("/api/treatments");

        $response->assertStatus(200);
    }
}
