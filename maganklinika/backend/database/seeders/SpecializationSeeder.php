<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecializationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('specializations')->insert([
            // Bőrgyógyászat
            ['specialization_name' => 'Bőrgyógyászat'],
            // Orthopédia
            ['specialization_name' => 'Orthopédia'],
            // Gyermekgyógyászat
            ['specialization_name' => 'Gyermekgyógyászat'],
            // Kardiológia
            ['specialization_name' => 'Kardiológia'],
            // Pszichiátria
            ['specialization_name' => 'Pszichiátria'],
            // Ideggyógyászat
            ['specialization_name' => 'Ideggyógyászat'],
            // Fogászat
            ['specialization_name' => 'Fogászat'],
            // Nőgyógyászat
            ['specialization_name' => 'Nőgyógyászat'],
            // Sebészet
            ['specialization_name' => 'Sebészet'],
            // Urológia
            ['specialization_name' => 'Urológia'],
            // Szemészet
            ['specialization_name' => 'Szemészet'],
            // Belgyógyászat
            ['specialization_name' => 'Belgyógyászat'],
            // Pszichológia
            ['specialization_name' => 'Pszichológia'],
            // Fül-orr-gégészet
            ['specialization_name' => 'Fül-orr-gégészet'],
            // Reumatológia
            ['specialization_name' => 'Reumatológia'],
        ]);
    }
}
