<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testUsers(): void
    {
        $response = $this->withoutMiddleware()->get('/api/users');

        $response->assertStatus(200);
    }
}
