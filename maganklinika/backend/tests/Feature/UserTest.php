<?php

namespace Tests\Feature;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Tests\TestCaseWithSeed;

class UserTest extends TestCaseWithSeed
{
    /**
     * A basic feature test example.
     */

    public function testUsers(): void
    {
        $response = $this->withoutMiddleware()->get('/api/users');

        $response->assertStatus(200);
    }

    public function test_users_auth(): void
    {
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

    public function test_userData(): void
    {
        $user = User::where('role_id', 2)->first();

        if (!$user) {
            $user = User::create([
                'name' => 'Dr. Test',
                'email' => 'drtest@example.com',
                'password' => bcrypt('password'),
                'role_id' => 2,
                'phone_number' => '1234567890'
            ]);
    
            // Hozz létre egy doktori rekordot is, ha nem létezik
            $doctor = Doctor::create([
                'user_id' => $user->id,
                'specialization_id' => 1 // Válassz egy létező specialization_id-t
            ]);
        }

        $this->assertNotNull($user, 'No user found');

        $response = $this->actingAs($user)->get('/api/user-data');
        $response->assertStatus(200);
    }


    public function test_changeUserInfo(): void
    {
        $user = User::where('role_id', 2)->first();

        $this->assertNotNull($user, 'No user found with role_id 2');

        $response = $this->actingAs($user)->put(
            "/api/change-user-info/{$user->id}",
            ['name' => 'Józsi', 'phone' => $user->phone_number, 'email' => $user->email]
        );
        $response->assertStatus(200);
    }
}
