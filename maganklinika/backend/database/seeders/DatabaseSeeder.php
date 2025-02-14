<?php

namespace Database\Seeders;

use App\Models\doctor;
use App\Models\patient;
use App\Models\role;
use App\Models\Specialization;
use App\Models\treatment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Szerepkörök létrehozása
        RoleSeeder::run();

        $this->call([
            SpecializationSeeder::class,
            TreatmentSeeder::class,
        ]);

        $doctorRoleId = 2;
        $patientRoleId = 3;

        // Létrehozunk 20 orvost és 20 pácienst
        User::factory(40)->create()->each(function ($user) use ($doctorRoleId, $patientRoleId) {
            if ($user->role_id === $doctorRoleId) {
                // Orvos rekord létrehozása
                Doctor::create([
                    'user_id' => $user->id,
                    'specialization_id' => Specialization::inRandomOrder()->first()->specialization_id, // Random specializáció
                ]);
            } elseif ($user->role_id === $patientRoleId) {
                // Páciens rekord létrehozása
                Patient::create([
                    'user_id' => $user->id,
                    'taj_number' => fake()->unique()->randomNumber(8, true), // Véletlenszerű 8 számjegyű TAJ szám
                    'birth_date' => fake()->date(), // Véletlenszerű születési dátum
                    'address' => fake()->address(), // Véletlenszerű cím
                ]);
            }
        });

        User::factory()->create([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => Hash::make('teszt123'),
            'role_id' => 1,
        ]);

        $this->call([
            NavigationSeeder::class,
            NavigationRoleSeeder::class,
        ]);
    }
}
