<?php

namespace Database\Factories;

use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Treatment>
 */
class TreatmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $treatments = [
            'Kardiológia' => ['EKG', 'Szívultrahang', 'Terheléses EKG'],
            'Neurológia' => ['EEG', 'ENG', 'EMG', 'Koponya MR'],
            'Ortopédia' => ['Röntgen', 'MRI', 'CT', 'Ultrahangos ízületi vizsgálat'],
            'Bőrgyógyászat' => ['Dermatoszkópos vizsgálat', 'Allergiavizsgálat', 'Biopszia'],
            'Szemészet' => ['Szemfenékvizsgálat', 'Látótérvizsgálat', 'OCT'],
            'Fül-orr-gégészet' => ['Hallásvizsgálat', 'Orr- és garatendoszkópia', 'Allergiateszt'],
            'Nőgyógyászat' => ['Ultrahang', 'Rákszűrés (citológia)', 'Hormonvizsgálatok'],
            'Urológia' => ['PSA-teszt', 'Vizeletvizsgálat', 'Hereultrahang'],
            'Gasztroenterológia' => ['Gyomortükrözés', 'Vastagbéltükrözés', 'Hasi ultrahang'],
            'Pszichiátria' => ['Pszichológiai tesztek', 'EEG', 'Neurotranszmitter-vizsgálatok'],
            'Endokrinológia' => ['Pajzsmirigy ultrahang', 'Vércukorvizsgálat', 'Hormonpanelek'],
            'Reumatológia' => ['Ízületi ultrahang', 'Röntgen', 'Vérvizsgálat'],
            'Pulmonológia' => ['Légzésfunkciós vizsgálat', 'Mellkasröntgen', 'Allergiateszt'],
            'Nefrológia' => ['Veseultrahang', 'Kreatinin-vizsgálat', 'Vizeletelemzés'],
            'Sebészet' => ['Sebészeti konzultáció', 'Szövettani vizsgálat', 'Ultrahang'],
            'Gyermekgyógyászat' => ['Általános fizikális vizsgálat', 'Ultrahang', 'Allergiateszt'],
            'Immunológia' => ['Autoimmun panelek', 'Allergiavizsgálatok', 'Vérképelemzés'],
            'Onkológia' => ['Tumormarkerek', 'Biopszia', 'CT vagy MR'],
            'Fogászat' => ['Fogászati panorámaröntgen', 'Fogkőeltávolítás', 'Tömés'],
            'Radiológia' => ['CT', 'MRI', 'Ultrahang', 'Röntgen']
        ];

        // Kiválasztunk egy specializációt
        $specialisation = Specialization::inRandomOrder()->first();

        return [
            'specialisation_id' => $specialisation->specialisation_id,
            'treatment_name' => fake()->randomElement($treatments[$specialisation->specialisation_name]),
            'treatment_length' => fake()->time('H:i:s', '02:00:00'), // max 2 órás kezelés
            'price' => fake()->numberBetween(5000, 20000),
        ];
    }
}
