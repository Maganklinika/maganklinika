<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Database\Seeders\RoleSeeder;

abstract class TestCaseWithSeed extends BaseTestCase
{
    use RefreshDatabase;

    /**
     * Minden egyes teszt futása előtt meghívódik.
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Migrációk törlése és újraépítése minden teszt előtt
        $this->artisan('migrate:fresh');

        // Alapértelmezett adatok seedelése (például roles)
        $this->seed(RoleSeeder::class);
    }
}
