<?php

namespace Tests;

use Database\Seeders\DatabaseSeeder;
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

        $this->artisan('migrate:fresh');

        $this->seed(
            DatabaseSeeder::class,
        );
    }
}
