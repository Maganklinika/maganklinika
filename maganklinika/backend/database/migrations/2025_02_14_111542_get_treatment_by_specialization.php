<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("DROP VIEW IF EXISTS get_treatment_by_specialization");
        $viewExists = DB::select("SHOW TABLES LIKE 'get_treatment_by_specialization'");
        if (empty($viewExists)) {
            DB::statement("
            CREATE VIEW get_treatment_by_specialization AS
            (
                SELECT s.specialization_id as s_id, s.specialization_name as s_name,t.treatment_id as t_id, t.treatment_name as t_name, t.treatment_length as t_length, t.price as t_price, d.user_id as d_id, u.name as d_name
                FROM treatments as t
                INNER JOIN specializations as s on t.specialization_id = s.specialization_id
                inner join doctors as d on d.specialization_id=s.specialization_id
                INNER join users as u on u.id = d.user_id
                ORDER BY s_name, t_name
            )
        ");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS get_treatment_by_specialization');
    }
};
