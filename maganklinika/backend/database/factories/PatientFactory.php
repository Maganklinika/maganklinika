<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'taj_number' => fake()->unique()->randomNumber(8, true), // 8 számjegyű TAJ szám
            'user_id' => User::where('role_id', Role::where('name', 'patient')->first()->role_id)->inRandomOrder()->first()->id,
            'birth_date' => fake()->date(),
            'address' => fake()->address(),
        ];
    }
}
