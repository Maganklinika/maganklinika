<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCaseWithSeed;

class RoleTest extends TestCaseWithSeed
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');
    }

    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        $response = $this->actingAs($admin)->get('/api/roles');
        $response->assertStatus(200);
    }
}
