<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared("
    CREATE TRIGGER check_appointment_overlap
    BEFORE INSERT ON doctor_appointments
    FOR EACH ROW
    BEGIN
        DECLARE treatment_length_minutes INT;
        DECLARE new_end_time DATETIME;

        -- A kezelés hosszának lekérése
        SELECT TIME_TO_SEC(treatment_length) / 60 
        INTO treatment_length_minutes
        FROM treatments
        WHERE treatment_id = NEW.treatment_id;

        -- Az új időpont végének kiszámítása
        SET new_end_time = DATE_ADD(NEW.start_time, INTERVAL treatment_length_minutes MINUTE);

        -- Ütközés ellenőrzése
        IF EXISTS (
            SELECT 1 FROM doctor_appointments
            WHERE doctor_id = NEW.doctor_id
            AND (
                (start_time BETWEEN NEW.start_time AND new_end_time)
                OR
                (DATE_ADD(start_time, INTERVAL (
                    SELECT TIME_TO_SEC(treatment_length) / 60 FROM treatments WHERE treatment_id = doctor_appointments.treatment_id
                ) MINUTE) BETWEEN NEW.start_time AND new_end_time)
                OR
                (start_time < NEW.start_time AND DATE_ADD(start_time, INTERVAL (
                    SELECT TIME_TO_SEC(treatment_length) / 60 FROM treatments WHERE treatment_id = doctor_appointments.treatment_id
                ) MINUTE) > new_end_time)
            )
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Az orvosnak már van időpontja ebben az időszakban';
        END IF;
    END;
");
    }

    public function down()
    {
        DB::unprepared("DROP TRIGGER IF EXISTS check_appointment_overlap;");
    }
};
