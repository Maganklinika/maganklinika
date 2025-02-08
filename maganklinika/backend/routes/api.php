<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\Doctor;
use App\Http\Middleware\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', Admin::class])
    ->group(function () {
        Route::get('/users', [UserController::class, 'index']);
    });

Route::middleware(['auth:sanctum', Doctor::class])
    ->group(function () {});

Route::middleware(['auth:sanctum', Patient::class])
    ->group(function () {});
