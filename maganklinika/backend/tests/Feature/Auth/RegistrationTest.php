<?php

namespace Tests\Feature\Auth;

use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;
    protected function setUp(): void
    {
        parent::setUp();

        // Reseteljük az auto-increment számlálót minden teszt előtt, ha szükséges
        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');
    }

    public function test_new_users_can_register(): void
    {

        RoleSeeder::run();

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'phone_number' => '1231343',
            'role_id' => 3,
        ]);
        
        $this->assertAuthenticated();

        $response->assertNoContent();
    }
}
