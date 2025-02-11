<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Role;
use App\Models\Specialization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        /*
        $existingUserIds = Doctor::pluck('user_id')->toArray();

        // Kiválasztunk egy orvost, aki nem szerepel a doctors táblában
        $user_id = User::where('role_id', Role::where('name', 'doctor')->first()->role_id)
            ->whereNotIn('id', $existingUserIds) // Kizárjuk a már orvosként szereplőket
            ->inRandomOrder()
            ->first();

        // Ha nem találtunk elérhető felhasználót, hibát dobunk
        if ($user_id) {
            return [
                'user_id' => $user_id->id,
                'specialization_id' => Specialization::inRandomOrder()->first()->specialization_id,
            ];
        } else {
            // Ha nincs elérhető felhasználó, hibát dobunk
            throw new \Exception('No available user_id for new doctor');
        }*/
    }
}
