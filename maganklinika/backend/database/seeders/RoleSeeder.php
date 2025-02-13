<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public static function run()
    {
        // Manuálisan hozzuk létre az id-kat, hogy 1-től 4-ig terjedjenek
        Role::create(['role_id' => 1, 'name' => 'admin']);
        Role::create(['role_id' => 2, 'name' => 'doctor']);
        Role::create(['role_id' => 3, 'name' => 'patient']);
        Role::create(['role_id' => 4, 'name' => 'guest']);
    }
}
