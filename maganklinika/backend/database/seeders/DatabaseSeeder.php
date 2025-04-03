<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Specialization;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        RoleSeeder::run();

        $this->call([
            SpecializationSeeder::class,
            TreatmentSeeder::class,
        ]);

        $doctorRoleId = 2;
        $patientRoleId = 3;

        User::factory(40)->create()->each(function ($user) use ($doctorRoleId, $patientRoleId) {
            if ($user->role_id === $doctorRoleId) {
                Doctor::create([
                    'user_id' => $user->id,
                    'specialization_id' => Specialization::inRandomOrder()->first()->specialization_id,
                ]);
            } elseif ($user->role_id === $patientRoleId) {
                Patient::create([
                    'user_id' => $user->id,
                    'taj_number' => fake()->unique()->randomNumber(8, true),
                    'birth_date' => fake()->date(),
                    'address' => fake()->address(),
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
            DoctorAppointmentSeeder::class,
            DoctorLicenceSeeder::class,
        ]);
    }
}
