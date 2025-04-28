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


        $this->call([
            RoleSeeder::class,
            SpecializationSeeder::class,
            TreatmentSeeder::class,
        ]);

        //----------------------------------------------------------------------------

        $doctorRoleId = 2;
        $patientRoleId = 3;

        // 1. Először generálunk néhány random beteget
        User::factory(40)->create()->each(function ($user) use ($doctorRoleId, $patientRoleId) {
            if ($user->role_id === $patientRoleId) {
                // Ha a user páciens
                Patient::create([
                    'user_id' => $user->id,
                    'taj_number' => fake()->unique()->randomNumber(8, true),
                    'birth_date' => fake()->date(),
                    'address' => fake()->address(),
                ]);
            } elseif ($user->role_id === $doctorRoleId) {
                // Ha a user orvos
                Doctor::create([
                    'user_id' => $user->id,
                    'specialization_id' => Specialization::inRandomOrder()->first()->specialization_id, // Véletlenszerű specializáció
                ]);
            }
        });

        // 2. Létrehozunk egy tömböt a már meglévő doctor user_id-kről
        $existingDoctorUserIds = Doctor::pluck('user_id')->toArray();

        // 3. Lekérjük a specializációkat
        $specializations = Specialization::all();

        foreach ($specializations as $specialization) {
            // Lekérjük az adott specializációhoz tartozó orvosokat
            $doctorsForSpec = Doctor::where('specialization_id', $specialization->specialization_id)->get();

            $needed = 2 - $doctorsForSpec->count(); // mennyi kell még

            if ($needed > 0) {
                // 4. Generálunk $needed számú új User-t (role_id = 2)
                for ($i = 0; $i < $needed; $i++) {
                    $user = User::create([
                        'name' => fake()->name(),
                        'phone_number' => fake()->unique()->phoneNumber(),
                        'email' => fake()->unique()->safeEmail(),
                        'email_verified_at' => now(),
                        'password' => bcrypt('password'),
                        'role_id' => $doctorRoleId,
                    ]);

                    // 5. Az új userből orvost csinálunk
                    Doctor::create([
                        'user_id' => $user->id,
                        'specialization_id' => $specialization->specialization_id,
                    ]);
                }
            }
        }

        // Debug: Ellenőrizzük, hogy minden spec-hez tényleg van legalább 2 orvos
        foreach ($specializations as $specialization) {
            $count = Doctor::where('specialization_id', $specialization->specialization_id)->count();
            if ($count < 2) {
                throw new \Exception("❌ A(z) {$specialization->name} spec-hez csak {$count} orvos van rendelve.");
            }
        }

        echo "✅ Minden specializációhoz legalább 2 orvos rendelve.\n";

        //----------------------------------------------------------------------------

        User::factory()->create([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);

        $patient = User::factory()->create([
            'name' => 'patienttest',
            'email' => 'patienttest@test.com',
            'password' => Hash::make('password'),
            'role_id' => 3,
        ]);

        Patient::create([
            'user_id' => $patient->id,
            'taj_number' => fake()->unique()->randomNumber(9, true),
            'birth_date' => fake()->date(),
            'address' => fake()->address(),
        ]);

        $doctor = User::factory()->create([
            'name' => 'doctortest',
            'email' => 'doctortest@test.com',
            'password' => Hash::make('password'),
            'role_id' => 2,
        ]);

        Doctor::create([
            'user_id' => $doctor->id,
            'specialization_id' => Specialization::inRandomOrder()->first()->specialization_id,
        ]);

        $this->call([
            NavigationSeeder::class,
            NavigationRoleSeeder::class,
            DoctorAppointmentSeeder::class,
            DoctorLicenceSeeder::class,
        ]);
    }
}
