<?php

use App\Http\Controllers\NavigationRoleController;
use App\Http\Controllers\RoleController;
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
        //Route::get('/users', [UserController::class, 'index']);
        Route::get('/roles', [RoleController::class, 'index']);
        Route::put('/update-nav', [NavigationRoleController::class, 'updateNavOrder']);
        Route::get('/get-nav-items-with-roles', [NavigationRoleController::class, 'getNavItemsWithRoles']);
        Route::get('/navs', [NavigationRoleController::class, 'index']);
        Route::post('/add-nav-to-role', [NavigationRoleController::class, 'addNavToRole']);
        Route::post('/check-nav-assigned-to-role', [NavigationRoleController::class, 'checkNavAssignedToRole']);
        Route::delete('/remove-nav-from-role/{id}', [NavigationRoleController::class, 'destroy']);
        Route::get('/users', [UserController::class, 'getUsersAndRoles']);
        Route::put('/update-user-role/{id}', [UserController::class, 'userRoleUpdate']);
    });

Route::middleware(['auth:sanctum', Doctor::class])
    ->group(function () {});

Route::middleware(['auth:sanctum', Patient::class])
    ->group(function () {});

Route::get('/nav-items', [NavigationRoleController::class, 'getNavItemsByRole']);