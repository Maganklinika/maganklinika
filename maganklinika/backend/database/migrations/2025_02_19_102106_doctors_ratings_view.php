<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement("DROP VIEW IF EXISTS doctors_ratings_view");
        $viewExists = DB::select("SHOW TABLES LIKE 'doctors_ratings_view'");
        if (empty($viewExists)) {
            DB::statement('
            CREATE VIEW doctors_ratings_view AS
            SELECT 
                u1.name AS doctor_name,
                u2.name AS patient_name,
                t.treatment_name,
                da.start_time,
                da.rating
            FROM doctor_appointments da
            JOIN doctors d ON da.doctor_id = d.user_id
            JOIN users u1 ON d.user_id = u1.id  -- orvos neve
            JOIN patients p ON da.patient_id = p.user_id
            JOIN users u2 ON p.user_id = u2.id  -- páciens neve
            JOIN treatments t ON da.treatment_id = t.treatment_id
        ');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
