<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('doctor_appointments', function (Blueprint $table) {
            $table->foreignId('doctor_id')->references('user_id')->on('doctors'); //key
            $table->datetime('start_time'); //key
            $table->foreignId('user_id')->references('user_id')->on('patients');
            $table->foreignId('treatment_id')->references('treatment_id')->on('treatments');
            $table->enum('status', ['booked', 'done', 'deleted_by_doctor', 'cancelled_by_patient']);
            $table->integer('rating');
            $table->timestamps();
            $table->primary(['doctor_id', 'start_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor_appointments');
    }
};
