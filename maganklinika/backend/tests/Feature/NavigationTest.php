<?php

namespace Tests\Feature;

use App\Models\Navigation;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class NavigationTest extends TestCase
{
    use RefreshDatabase;
    protected function setUp(): void
    {
        parent::setUp();

        // Reseteljük az auto-increment számlálót minden teszt előtt, ha szükséges
        DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1');
    }
    public function test_example(): void
    {
        $response = $this->get('/api/nav-items');

        $response->assertStatus(200);
    }

    public function test_update_nav(): void
    {
        RoleSeeder::run();
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        DB::table('navigations')->insert([
            ['name' => 'Főoldal', 'URL' => '/fooldal', 'component_name' => 'Fooldal'],
            ['name' => 'Bejelentkezés', 'URL' => '/bejelentkezes', 'component_name' => 'Bejelentkezes'],
        ]);

        DB::table('navigation_roles')->insert([
            ['navigation_id' => 1, 'role_id' => 1, 'ranking' => 10],
            ['navigation_id' => 2, 'role_id' => 1, 'ranking' => 20],
        ]);

        $response = $this->actingAs($admin)->put('/api/update-nav', [
            'items' => [
                ['id' => 1, 'ranking' => 1,],
                ['id' => 2, 'ranking' => 2,]
            ]
        ]);
        $response->assertStatus(200);
    }

    public function test_get_nav_items_with_roles(): void
    {
        RoleSeeder::run();
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        DB::table('navigations')->insert([
            ['name' => 'Főoldal', 'URL' => '/fooldal', 'component_name' => 'Fooldal'],
            ['name' => 'Bejelentkezés', 'URL' => '/bejelentkezes', 'component_name' => 'Bejelentkezes'],
        ]);

        $response = $this->actingAs($admin)->get('/api/get-nav-items-with-roles');
        $response->assertStatus(200);
    }

    public function test_get_navigation(): void
    {
        RoleSeeder::run();
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        DB::table('navigations')->insert([
            ['name' => 'Főoldal', 'URL' => '/fooldal', 'component_name' => 'Fooldal'],
            ['name' => 'Bejelentkezés', 'URL' => '/bejelentkezes', 'component_name' => 'Bejelentkezes'],
        ]);

        $response = $this->actingAs($admin)->get('/api/navs');
        $response->assertStatus(200);
    }

    public function test_add_nav_to_role(): void
    {
        RoleSeeder::run();
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        DB::table('navigations')->insert([
            ['name' => 'Főoldal', 'URL' => '/fooldal', 'component_name' => 'Fooldal'],
            ['name' => 'Bejelentkezés', 'URL' => '/bejelentkezes', 'component_name' => 'Bejelentkezes'],
        ]);

        $response = $this->actingAs($admin)->post('/api/add-nav-to-role', [
            'navigation_id' => 1,
            'name' => 'doctor',
        ]);
        $response->assertStatus(200);
    }


    public function test_check_nav_assigned_to_role(): void
    {
        RoleSeeder::run();
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        DB::table('navigations')->insert([
            ['name' => 'Főoldal', 'URL' => '/fooldal', 'component_name' => 'Fooldal'],
            ['name' => 'Bejelentkezés', 'URL' => '/bejelentkezes', 'component_name' => 'Bejelentkezes'],
        ]);

        $response = $this->actingAs($admin)->post('/api/check-nav-assigned-to-role', [
            'navigation_id' => 1,
            'name' => 'doctor',
        ]);
        $response->assertStatus(200);
    }



    public function test_remove_nav_from_role(): void
    {
        RoleSeeder::run();
        $admin = User::factory()->create([
            'role_id' => 1,
        ]);

        DB::table('navigations')->insert([
            ['name' => 'Főoldal', 'URL' => '/fooldal', 'component_name' => 'Fooldal'],
            ['name' => 'Bejelentkezés', 'URL' => '/bejelentkezes', 'component_name' => 'Bejelentkezes'],
        ]);

        DB::table('navigation_roles')->insert([
            ['navigation_id' => 1, 'role_id' => 1, 'ranking' => 10],
            ['navigation_id' => 2, 'role_id' => 1, 'ranking' => 20],
        ]);

        $itemToDelete = 1;
        $response = $this->actingAs($admin)->delete('/api/remove-nav-from-role/' . $itemToDelete);
        $response->assertStatus(200);
    }
}
