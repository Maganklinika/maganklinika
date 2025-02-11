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
        Schema::create('navigation_roles', function (Blueprint $table) {
            $table->id('navigationRole_id');
            $table->integer('ranking');
            $table->foreignId('role_id')->references('role_id')->on('roles');
            $table->foreignId('navigation_id')->references('navigation_id')->on('navigations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('navigation_roles');
    }
};
