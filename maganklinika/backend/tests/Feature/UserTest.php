<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    
    protected function setUp(): void
    {
        parent::setUp();

        // Reseteljük az auto-increment számlálót minden teszt előtt, ha szükséges
        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');
    }

    public function testUsers(): void
    {
        $response = $this->withoutMiddleware()->get('/api/users');

        $response->assertStatus(200);
    }

    public function test_users_auth(): void
    {
        Role::run();
        $adminRoleId = Role::where('name', 'admin')->first()->role_id;
        echo($adminRoleId);
        $admin = User::factory()->create([
            'role_id' => $adminRoleId,
        ]);
        $response = $this->actingAs($admin)->get('/api/users/');
        $response->assertStatus(200);
    }
}
