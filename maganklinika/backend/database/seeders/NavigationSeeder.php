<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NavigationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('navigations')->insert([
            ['name' => 'Bejelentkezés', 'url' => '/login', 'component_name' => 'Bejelentkezes', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Regisztráció', 'url' => '/register', 'component_name' => 'Regisztracio', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Főoldal', 'url' => '/', 'component_name' => 'Fooldal', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Kapcsolat', 'url' => '/contact', 'component_name' => 'Kapcsolat', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Doktorok', 'url' => '/doctors', 'component_name' => 'Doktorok', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Páciensek', 'url' => '/patients', 'component_name' => 'Paciensek', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Nav elemek', 'url' => '/navs', 'component_name' => 'NavElemek', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Felhasználók', 'url' => '/users', 'component_name' => 'Felhasznalok', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Kijelentkezés', 'url' => '/logout', 'component_name' => 'Kijelentkezes', 'parent' => null, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
