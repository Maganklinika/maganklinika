<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCaseWithSeed;

class RegistrationTest extends TestCaseWithSeed
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'phone_number' => '1231343',
            'selectedValue' => 'admin',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com'
        ]);

        $user = \App\Models\User::where('email', 'test@example.com')->first();
        $this->actingAs($user);

        $this->assertAuthenticated();

        $response->assertNoContent();
    }
}
