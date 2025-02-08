<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Specialization>
 */
class SpecializationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specialisations = [
            'Kardiológia', 'Neurológia', 'Ortopédia', 'Bőrgyógyászat', 'Szemészet', 
            'Fül-orr-gégészet', 'Nőgyógyászat', 'Urológia', 'Gasztroenterológia', 
            'Pszichiátria', 'Endokrinológia', 'Reumatológia', 'Pulmonológia', 
            'Nefrológia', 'Sebészet', 'Gyermekgyógyászat', 'Immunológia', 
            'Onkológia', 'Fogászat', 'Radiológia'
        ];

        return [
            'specialisation_name' => fake()->randomElement($specialisations),
        ];
    }
}
