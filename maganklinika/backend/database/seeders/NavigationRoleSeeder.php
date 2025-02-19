<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NavigationRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Guest szerepkör (role_id = 4) alap menüpontok
        $guestRoleId = 4; // Vendég szerepkör ID-ja
        $ranking = 1;

        // Főoldal menüpont (id: 1)
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 1, // Főoldal menüpont id-je
        ]);

        // Bejelentkezés menüpont (id: 2)
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 2, // Bejelentkezés menüpont id-je
        ]);

        // Regisztráció menüpont (id: 3)
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 3, // Regisztráció menüpont id-je
        ]);
        $ranking = 1;
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 3,
            'navigation_id' => 10,
        ]);
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 3,
            'navigation_id' => 9,
        ]);
        $ranking = 1;
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 9, // Regisztráció menüpont id-je
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 11,
        ]);
        // Admin szerepkör menüpontjai (role_id = 1) - MINDEN MENÜPONT HOZZÁADÁSA
        $adminRoleId = 1; // Admin szerepkör ID-ja

        // Lekérjük az összes menüpontot a nav táblából
        $navItems = DB::table('navigations')->get();
        $ranking = 1;
        // Iterálunk a menüpontokon és hozzárendeljük őket az admin szerepkörhöz
        foreach ($navItems as $navItem) {
            if ($navItem->name !== "Bejelentkezés" && $navItem->name !== "Regisztráció") {
                DB::table('navigation_roles')->insert([
                    'ranking' => $ranking++,
                    'role_id' => $adminRoleId,
                    'navigation_id' => $navItem->navigation_id, // Menüpont ID-ja
                ]);
            }
        }
    }
}
