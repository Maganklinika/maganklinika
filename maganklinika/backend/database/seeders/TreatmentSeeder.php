<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TreatmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dermatologyId = DB::table('specializations')->where('specialization_name', 'Bőrgyógyászat')->first()->specialization_id;
        $orthopedicsId = DB::table('specializations')->where('specialization_name', 'Orthopédia')->first()->specialization_id;
        $pediatricsId = DB::table('specializations')->where('specialization_name', 'Gyermekgyógyászat')->first()->specialization_id;
        $cardiologyId = DB::table('specializations')->where('specialization_name', 'Kardiológia')->first()->specialization_id;
        $psychiatryId = DB::table('specializations')->where('specialization_name', 'Pszichiátria')->first()->specialization_id;
        $neurologyId = DB::table('specializations')->where('specialization_name', 'Ideggyógyászat')->first()->specialization_id;
        $dentistryId = DB::table('specializations')->where('specialization_name', 'Fogászat')->first()->specialization_id;
        $gynecologyId = DB::table('specializations')->where('specialization_name', 'Nőgyógyászat')->first()->specialization_id;
        $surgeryId = DB::table('specializations')->where('specialization_name', 'Sebészet')->first()->specialization_id;
        $urologyId = DB::table('specializations')->where('specialization_name', 'Urológia')->first()->specialization_id;
        $ophthalmologyId = DB::table('specializations')->where('specialization_name', 'Szemészet')->first()->specialization_id;
        $internalMedicineId = DB::table('specializations')->where('specialization_name', 'Belgyógyászat')->first()->specialization_id;
        $psychologyId = DB::table('specializations')->where('specialization_name', 'Pszichológia')->first()->specialization_id;
        $entId = DB::table('specializations')->where('specialization_name', 'Fül-orr-gégészet')->first()->specialization_id;
        $rheumatologyId = DB::table('specializations')->where('specialization_name', 'Reumatológia')->first()->specialization_id;

        DB::table('treatments')->insert([
            ['specialization_id' => $dermatologyId, 'treatment_name' => 'Pattanás kezelés', 'treatment_length' => '00:30:00', 'price' => 5000],
            ['specialization_id' => $dermatologyId, 'treatment_name' => 'Bőrrák szűrés', 'treatment_length' => '00:45:00', 'price' => 10000],
            ['specialization_id' => $dermatologyId, 'treatment_name' => 'Anyajegy eltávolítás', 'treatment_length' => '00:40:00', 'price' => 15000],
            ['specialization_id' => $dermatologyId, 'treatment_name' => 'Bőrbiopszia', 'treatment_length' => '00:30:00', 'price' => 12000],
            ['specialization_id' => $dermatologyId, 'treatment_name' => 'Vírusos szemölcs eltávolítás', 'treatment_length' => '00:25:00', 'price' => 7000],
            ['specialization_id' => $dermatologyId, 'treatment_name' => 'Molekuláris bőrfiatalítás', 'treatment_length' => '00:50:00', 'price' => 25000],

            ['specialization_id' => $orthopedicsId, 'treatment_name' => 'Térdműtét', 'treatment_length' => '02:00:00', 'price' => 25000],
            ['specialization_id' => $orthopedicsId, 'treatment_name' => 'Gerincszűrés', 'treatment_length' => '01:00:00', 'price' => 5000],
            ['specialization_id' => $orthopedicsId, 'treatment_name' => 'Bokaficam kezelés', 'treatment_length' => '00:45:00', 'price' => 8000],
            ['specialization_id' => $orthopedicsId, 'treatment_name' => 'Csonttörés kezelése', 'treatment_length' => '02:30:00', 'price' => 22000],
            ['specialization_id' => $orthopedicsId, 'treatment_name' => 'Rehabilitációs terápia', 'treatment_length' => '01:30:00', 'price' => 12000],
            ['specialization_id' => $orthopedicsId, 'treatment_name' => 'Izomsérülés kezelés', 'treatment_length' => '01:00:00', 'price' => 9000],

            ['specialization_id' => $pediatricsId, 'treatment_name' => 'Vakcinálás', 'treatment_length' => '00:20:00', 'price' => 1500],
            ['specialization_id' => $pediatricsId, 'treatment_name' => 'Általános gyermekvizsgálat', 'treatment_length' => '00:40:00', 'price' => 3500],
            ['specialization_id' => $pediatricsId, 'treatment_name' => 'Fejlesztési elmaradás szűrése', 'treatment_length' => '00:30:00', 'price' => 6000],
            ['specialization_id' => $pediatricsId, 'treatment_name' => 'Légúti fertőzések kezelése', 'treatment_length' => '00:40:00', 'price' => 5000],
            ['specialization_id' => $pediatricsId, 'treatment_name' => 'Mikrobiológiai vizsgálat', 'treatment_length' => '00:45:00', 'price' => 7000],
            ['specialization_id' => $pediatricsId, 'treatment_name' => 'Szoptatás tanácsadás', 'treatment_length' => '00:30:00', 'price' => 4000],

            ['specialization_id' => $cardiologyId, 'treatment_name' => 'EKG', 'treatment_length' => '00:30:00', 'price' => 8000],
            ['specialization_id' => $cardiologyId, 'treatment_name' => 'Szívműtét', 'treatment_length' => '03:00:00', 'price' => 60000],
            ['specialization_id' => $cardiologyId, 'treatment_name' => 'Vérnyomás kezelés', 'treatment_length' => '00:30:00', 'price' => 3000],
            ['specialization_id' => $cardiologyId, 'treatment_name' => 'Szívritmuszavar kezelése', 'treatment_length' => '01:30:00', 'price' => 15000],
            ['specialization_id' => $cardiologyId, 'treatment_name' => 'Vérkeringés javítása', 'treatment_length' => '00:45:00', 'price' => 10000],
            ['specialization_id' => $cardiologyId, 'treatment_name' => 'Szívultrahang', 'treatment_length' => '00:45:00', 'price' => 12000],

            ['specialization_id' => $psychiatryId, 'treatment_name' => 'Mentális egészség felmérése', 'treatment_length' => '01:00:00', 'price' => 7000],
            ['specialization_id' => $psychiatryId, 'treatment_name' => 'Pszichoterápia', 'treatment_length' => '00:50:00', 'price' => 5000],
            ['specialization_id' => $psychiatryId, 'treatment_name' => 'Depresszió kezelés', 'treatment_length' => '01:00:00', 'price' => 8000],
            ['specialization_id' => $psychiatryId, 'treatment_name' => 'Stresszkezelés', 'treatment_length' => '00:40:00', 'price' => 4000],
            ['specialization_id' => $psychiatryId, 'treatment_name' => 'Szorongásos zavar kezelése', 'treatment_length' => '01:00:00', 'price' => 6000],
            ['specialization_id' => $psychiatryId, 'treatment_name' => 'Panikbetegség kezelés', 'treatment_length' => '00:50:00', 'price' => 7500],

            ['specialization_id' => $neurologyId, 'treatment_name' => 'Neurológiai vizsgálat', 'treatment_length' => '00:45:00', 'price' => 10000],
            ['specialization_id' => $neurologyId, 'treatment_name' => 'Migrén kezelése', 'treatment_length' => '01:00:00', 'price' => 12000],
            ['specialization_id' => $neurologyId, 'treatment_name' => 'Epilepszia kezelése', 'treatment_length' => '01:00:00', 'price' => 11000],
            ['specialization_id' => $neurologyId, 'treatment_name' => 'Alvászavar kezelés', 'treatment_length' => '00:50:00', 'price' => 8000],
            ['specialization_id' => $neurologyId, 'treatment_name' => 'Gerincvelő sérülések kezelése', 'treatment_length' => '02:00:00', 'price' => 25000],
            ['specialization_id' => $neurologyId, 'treatment_name' => 'Parkinson-kór kezelése', 'treatment_length' => '01:30:00', 'price' => 15000],

            ['specialization_id' => $dentistryId, 'treatment_name' => 'Fogsor pótolás', 'treatment_length' => '01:00:00', 'price' => 20000],
            ['specialization_id' => $dentistryId, 'treatment_name' => 'Foghúzás', 'treatment_length' => '00:40:00', 'price' => 6000],
            ['specialization_id' => $dentistryId, 'treatment_name' => 'Fogkő eltávolítás', 'treatment_length' => '00:30:00', 'price' => 3000],
            ['specialization_id' => $dentistryId, 'treatment_name' => 'Fogfehérítés', 'treatment_length' => '00:45:00', 'price' => 10000],
            ['specialization_id' => $dentistryId, 'treatment_name' => 'Cápa fog kezelés', 'treatment_length' => '01:00:00', 'price' => 15000],
            ['specialization_id' => $dentistryId, 'treatment_name' => 'Tömés készítése', 'treatment_length' => '00:30:00', 'price' => 5000],

            ['specialization_id' => $gynecologyId, 'treatment_name' => 'Ultrahangos vizsgálat', 'treatment_length' => '00:40:00', 'price' => 8000],
            ['specialization_id' => $gynecologyId, 'treatment_name' => 'Méhnyak szűrés', 'treatment_length' => '00:30:00', 'price' => 5000],
            ['specialization_id' => $gynecologyId, 'treatment_name' => 'Terhességi vizsgálat', 'treatment_length' => '00:50:00', 'price' => 6000],
            ['specialization_id' => $gynecologyId, 'treatment_name' => 'Méhpolip eltávolítás', 'treatment_length' => '01:00:00', 'price' => 15000],
            ['specialization_id' => $gynecologyId, 'treatment_name' => 'Fájdalomcsillapítás szülés előtt', 'treatment_length' => '00:30:00', 'price' => 7000],
            ['specialization_id' => $gynecologyId, 'treatment_name' => 'Laparoszkópiás műtét', 'treatment_length' => '02:00:00', 'price' => 25000],

            ['specialization_id' => $surgeryId, 'treatment_name' => 'Appendectomia', 'treatment_length' => '02:00:00', 'price' => 25000],
            ['specialization_id' => $surgeryId, 'treatment_name' => 'Műtéti sebkezelés', 'treatment_length' => '00:30:00', 'price' => 5000],
            ['specialization_id' => $surgeryId, 'treatment_name' => 'Laparotomia', 'treatment_length' => '03:00:00', 'price' => 35000],
            ['specialization_id' => $surgeryId, 'treatment_name' => 'Mellműtét', 'treatment_length' => '02:30:00', 'price' => 40000],
            ['specialization_id' => $surgeryId, 'treatment_name' => 'Ortopédiai műtét', 'treatment_length' => '02:00:00', 'price' => 20000],
            ['specialization_id' => $surgeryId, 'treatment_name' => 'Tüdőműtét', 'treatment_length' => '03:30:00', 'price' => 45000],

            ['specialization_id' => $urologyId, 'treatment_name' => 'Proszata vizsgálat', 'treatment_length' => '00:30:00', 'price' => 8000],
            ['specialization_id' => $urologyId, 'treatment_name' => 'Húgyúti fertőzés kezelés', 'treatment_length' => '00:45:00', 'price' => 6000],
            ['specialization_id' => $urologyId, 'treatment_name' => 'Vesekő eltávolítás', 'treatment_length' => '02:00:00', 'price' => 20000],
            ['specialization_id' => $urologyId, 'treatment_name' => 'Cystoszkópiás vizsgálat', 'treatment_length' => '01:00:00', 'price' => 10000],
            ['specialization_id' => $urologyId, 'treatment_name' => 'Férfi termékenység vizsgálat', 'treatment_length' => '00:50:00', 'price' => 12000],
            ['specialization_id' => $urologyId, 'treatment_name' => 'Urológiai műtét', 'treatment_length' => '02:00:00', 'price' => 25000],

            ['specialization_id' => $ophthalmologyId, 'treatment_name' => 'Szemvizsgálat', 'treatment_length' => '00:30:00', 'price' => 5000],
            ['specialization_id' => $ophthalmologyId, 'treatment_name' => 'Látásjavító műtét', 'treatment_length' => '01:00:00', 'price' => 25000],
            ['specialization_id' => $ophthalmologyId, 'treatment_name' => 'Szemnyomás mérés', 'treatment_length' => '00:20:00', 'price' => 3000],
            ['specialization_id' => $ophthalmologyId, 'treatment_name' => 'Szürkehályog műtét', 'treatment_length' => '02:00:00', 'price' => 45000],
            ['specialization_id' => $ophthalmologyId, 'treatment_name' => 'Szemüveg recept írás', 'treatment_length' => '00:15:00', 'price' => 2000],
            ['specialization_id' => $ophthalmologyId, 'treatment_name' => 'Szemfájdalom kezelése', 'treatment_length' => '00:30:00', 'price' => 8000],

            ['specialization_id' => $internalMedicineId, 'treatment_name' => 'Általános vizsgálat', 'treatment_length' => '00:40:00', 'price' => 7000],
            ['specialization_id' => $internalMedicineId, 'treatment_name' => 'Vérnyomás mérés', 'treatment_length' => '00:20:00', 'price' => 3000],
            ['specialization_id' => $internalMedicineId, 'treatment_name' => 'Légzési problémák kezelése', 'treatment_length' => '00:50:00', 'price' => 10000],
            ['specialization_id' => $internalMedicineId, 'treatment_name' => 'Laborvizsgálat', 'treatment_length' => '00:30:00', 'price' => 5000],
            ['specialization_id' => $internalMedicineId, 'treatment_name' => 'Szívultrahang', 'treatment_length' => '00:40:00', 'price' => 15000],
            ['specialization_id' => $internalMedicineId, 'treatment_name' => 'Diabetes kezelés', 'treatment_length' => '00:45:00', 'price' => 12000],

            ['specialization_id' => $psychologyId, 'treatment_name' => 'Pszichológiai konzultáció', 'treatment_length' => '00:50:00', 'price' => 15000],
            ['specialization_id' => $psychologyId, 'treatment_name' => 'Stresszkezelés', 'treatment_length' => '00:45:00', 'price' => 12000],
            ['specialization_id' => $psychologyId, 'treatment_name' => 'Szorongás kezelés', 'treatment_length' => '01:00:00', 'price' => 18000],
            ['specialization_id' => $psychologyId, 'treatment_name' => 'Párkapcsolati tanácsadás', 'treatment_length' => '01:00:00', 'price' => 15000],
            ['specialization_id' => $psychologyId, 'treatment_name' => 'Depresszió kezelése', 'treatment_length' => '01:30:00', 'price' => 20000],
            ['specialization_id' => $psychologyId, 'treatment_name' => 'Alvászavar kezelés', 'treatment_length' => '00:50:00', 'price' => 12000],

            ['specialization_id' => $entId, 'treatment_name' => 'Fülvizsgálat', 'treatment_length' => '00:30:00', 'price' => 5000],
            ['specialization_id' => $entId, 'treatment_name' => 'Hangszál vizsgálat', 'treatment_length' => '00:40:00', 'price' => 7000],
            ['specialization_id' => $entId, 'treatment_name' => 'Orrpolip eltávolítás', 'treatment_length' => '02:00:00', 'price' => 20000],
            ['specialization_id' => $entId, 'treatment_name' => 'Mandulaműtét', 'treatment_length' => '01:30:00', 'price' => 18000],
            ['specialization_id' => $entId, 'treatment_name' => 'Légúti fertőzések kezelése', 'treatment_length' => '00:50:00', 'price' => 12000],
            ['specialization_id' => $entId, 'treatment_name' => 'Hallásvizsgálat', 'treatment_length' => '00:30:00', 'price' => 4000],

            ['specialization_id' => $rheumatologyId, 'treatment_name' => 'Ízületi fájdalmak kezelése', 'treatment_length' => '01:00:00', 'price' => 12000],
            ['specialization_id' => $rheumatologyId, 'treatment_name' => 'Mozgásszervi vizsgálat', 'treatment_length' => '00:45:00', 'price' => 10000],
            ['specialization_id' => $rheumatologyId, 'treatment_name' => 'Reumatikus megbetegedések kezelése', 'treatment_length' => '01:30:00', 'price' => 18000],
            ['specialization_id' => $rheumatologyId, 'treatment_name' => 'Gerinc problémák kezelése', 'treatment_length' => '01:00:00', 'price' => 14000],
            ['specialization_id' => $rheumatologyId, 'treatment_name' => 'Hátfájás kezelése', 'treatment_length' => '00:40:00', 'price' => 8000],
            ['specialization_id' => $rheumatologyId, 'treatment_name' => 'Nyaki fájdalom kezelése', 'treatment_length' => '00:50:00', 'price' => 11000],
        ]);
    }
}
