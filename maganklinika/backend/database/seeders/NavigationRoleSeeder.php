<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NavigationRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $guestRoleId = 4;

        $ranking = 1;
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 3,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 10,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 13,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 5,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 4,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 1,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => $guestRoleId,
            'navigation_id' => 2,
        ]);

        $ranking = 1;

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 3,
            'navigation_id' => 3,
        ]);
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 3,
            'navigation_id' => 13,
        ]);
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 3,
            'navigation_id' => 5,
        ]);
        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 3,
            'navigation_id' => 4,
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
            'navigation_id' => 3,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 13,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 5,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 4,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 6,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 11,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 12,
        ]);

        DB::table('navigation_roles')->insert([
            'ranking' => $ranking++,
            'role_id' => 2,
            'navigation_id' => 9,
        ]);

        $adminRoleId = 1;

        $navItems = DB::table('navigations')->get();
        $ranking = 1;
        foreach ($navItems as $navItem) {
            if ($navItem->name !== "Bejelentkezés" && $navItem->name !== "Regisztráció") {
                DB::table('navigation_roles')->insert([
                    'ranking' => $ranking++,
                    'role_id' => $adminRoleId,
                    'navigation_id' => $navItem->navigation_id,
                ]);
            }
        }
    }
}
