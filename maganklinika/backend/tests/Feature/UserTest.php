<?php

namespace Tests\Feature;

use App\Models\User;
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

    public function test_users_auth() : void {
        //$this->withoutExceptionHandling();
        // create rögzíti az adatbázisban a felh-t
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);
        $response = $this->actingAs($admin)->get('/api/users/'.$admin->id);
        $response->assertStatus(200);
    }


}
