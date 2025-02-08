<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DoctorAppointment>
 */
class DoctorAppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start_time'=>fake()->dateTime(),
            //státusz - enum hiányzik
            'rating'=>fake()->rand(1,5)
        ];
    }
}
