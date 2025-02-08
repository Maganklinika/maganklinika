<?php

namespace Database\Factories;

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
    public function definition(): array
    {
        return [
            'user_id' => User::where('role_id', Role::where('name', 'doctor')->first()->role_id)->inRandomOrder()->first()->id,
            'specialisation_id' => Specialization::inRandomOrder()->first()->specialisation_id,
        ];
    }
}
