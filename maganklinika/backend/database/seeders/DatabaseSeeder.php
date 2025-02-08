<?php

namespace Database\Seeders;

use App\Models\doctor;
use App\Models\patient;
use App\Models\role;
use App\Models\specialisation;
use App\Models\Specialization;
use App\Models\treatment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Szerepkörök létrehozása
        Role::factory()->create(['name' => 'admin']);
        Role::factory()->create(['name' => 'doctor']);
        Role::factory()->create(['name' => 'patient']);

        // 20 véletlenszerű felhasználó létrehozása
        User::factory(20)->create();

        // Specializációk létrehozása
        $specializations = [
            'Kardiológia', 'Neurológia', 'Ortopédia', 'Bőrgyógyászat', 'Szemészet', 
            'Fül-orr-gégészet', 'Nőgyógyászat', 'Urológia', 'Gasztroenterológia', 
            'Pszichiátria', 'Endokrinológia', 'Reumatológia', 'Pulmonológia', 
            'Nefrológia', 'Sebészet', 'Gyermekgyógyászat', 'Immunológia', 
            'Onkológia', 'Fogászat', 'Radiológia'
        ];

        foreach ($specializations as $specialization) {
            Specialization::create(['specialization_name' => $specialization]);
        }

        // Vizsgálatok generálása (minden specializációhoz legalább 3)
        Treatment::factory(60)->create();

        // Orvosok és páciensek létrehozása
        Doctor::factory(10)->create(); // 10 orvos, mindegyiknek 1 szakirány
        Patient::factory(10)->create(); // 10 páciens
    }
}

