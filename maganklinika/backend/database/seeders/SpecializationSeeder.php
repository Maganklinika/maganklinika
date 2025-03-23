<?php

namespace Database\Seeders;

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
            ['specialization_name' => 'Bőrgyógyászat'],
            ['specialization_name' => 'Orthopédia'],
            ['specialization_name' => 'Gyermekgyógyászat'],
            ['specialization_name' => 'Kardiológia'],
            ['specialization_name' => 'Pszichiátria'],
            ['specialization_name' => 'Ideggyógyászat'],
            ['specialization_name' => 'Fogászat'],
            ['specialization_name' => 'Nőgyógyászat'],
            ['specialization_name' => 'Sebészet'],
            ['specialization_name' => 'Urológia'],
            ['specialization_name' => 'Szemészet'],
            ['specialization_name' => 'Belgyógyászat'],
            ['specialization_name' => 'Pszichológia'],
            ['specialization_name' => 'Fül-orr-gégészet'],
            ['specialization_name' => 'Reumatológia'],
        ]);
    }
}
