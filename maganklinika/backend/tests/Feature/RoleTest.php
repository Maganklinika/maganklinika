<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Reseteljük az auto-increment számlálót minden teszt előtt, ha szükséges
        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');
    }

    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        Role::run();
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        $response = $this->actingAs($admin)->get('/api/roles');
        $response->assertStatus(200);
    }
}
