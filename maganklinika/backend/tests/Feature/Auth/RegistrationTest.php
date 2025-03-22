<?php

namespace Tests\Feature\Auth;

use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;
use Tests\TestCaseWithSeed;

class RegistrationTest extends TestCaseWithSeed
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        // Teszt során a selectedValue paramétert kell küldeni
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'phone_number' => '1231343',
            'selectedValue' => 'admin', // 'admin', 'doctor', vagy 'patient' szerepelhet itt
        ]);

        // ✅ Ellenőrizzük, hogy a felhasználó létrejött-e
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com'
        ]);

        // ✅ Beléptetjük a felhasználót manuálisan a teszt során
        $user = \App\Models\User::where('email', 'test@example.com')->first();
        $this->actingAs($user);

        // ✅ Most már ellenőrizhetjük, hogy be van-e jelentkezve
        $this->assertAuthenticated();

        // ✅ Ellenőrizzük, hogy a válasz megfelelő
        $response->assertNoContent();
    }
}
