<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public static function run()
    {
        Role::create(['role_id' => 1, 'name' => 'admin']);
        Role::create(['role_id' => 2, 'name' => 'doctor']);
        Role::create(['role_id' => 3, 'name' => 'patient']);
        Role::create(['role_id' => 4, 'name' => 'guest']);
    }
}
