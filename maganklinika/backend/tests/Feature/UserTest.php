<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Database\Seeders\RoleSeeder;
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
        RoleSeeder::run();
        $adminRoleId = 1;
        $admin = User::factory()->create([
            'role_id' => $adminRoleId,
        ]);
        $response = $this->actingAs($admin)->get('/api/users/');
        $response->assertStatus(200);
    }

    public function test_update_user_role(): void
    {
        
        $adminRoleId = 1;
        $admin = User::factory()->create([
            'role_id' => $adminRoleId,
        ]);

        $response = $this->actingAs($admin)->put('/api/update-user-role/' . $admin->role_id, ['role_id' => 2]);
        $response->assertStatus(200);
    }
}
