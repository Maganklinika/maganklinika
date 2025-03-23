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
            $table->id();
            $table->foreignId('doctor_id')->references('user_id')->on('doctors');
            $table->datetime('start_time');
            $table->foreignId('patient_id')->nullable()->references('user_id')->on('patients');
            $table->foreignId('treatment_id')->references('treatment_id')->on('treatments');
            $table->string('description')->nullable();
            $table->enum('status', ['v', 'b', 'd', 'c', 'p']); //v - 'vacant', b - 'booked', d - 'done', c - 'deleted_by_doctor',  p - 'cancelled_by_patient'
            $table->integer('rating')->nullable();
            $table->timestamps();
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
