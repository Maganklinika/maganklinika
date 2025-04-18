<?php

use App\Http\Controllers\DoctorAppointmentController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\DoctorLicenceController;
use App\Http\Controllers\DoctorRatingsViewController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\GetTreatmentBySpecializationController;
use App\Http\Controllers\NavigationController;
use App\Http\Controllers\NavigationRoleController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SpecializationController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\Doctor;
use App\Http\Middleware\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/user/email-status', function (Request $request) {
    return response()->json([
        'email_verified' => $request->user()->hasVerifiedEmail(),
    ]);
});

Route::middleware(['auth:sanctum', Admin::class])
    ->group(function () {
        //Route::get('/users', [UserController::class, 'index']);
        Route::get('/roles', [RoleController::class, 'index']);
        Route::put('/update-nav', [NavigationRoleController::class, 'updateNavOrder']);
        Route::get('/get-nav-items-with-roles', [NavigationRoleController::class, 'getNavItemsWithRoles']);
        Route::get('/navs', [NavigationController::class, 'index']);
        Route::post('/add-nav-to-role', [NavigationRoleController::class, 'addNavToRole']);
        Route::post('/check-nav-assigned-to-role', [NavigationRoleController::class, 'checkNavAssignedToRole']);
        Route::delete('/remove-nav-from-role/{id}', [NavigationRoleController::class, 'destroy']);
        Route::get('/users', [UserController::class, 'getUsersAndRoles']);
        Route::put('/update-user-role/{id}', [UserController::class, 'userRoleUpdate']);
    });

Route::middleware(['auth:sanctum', Doctor::class])
    ->group(function () {
        Route::post('/create-appointments', [DoctorAppointmentController::class, 'createAppointments']);
        Route::get('/get-all-patients-with-name', [PatientController::class, 'getAllPatientsWithName']);
        Route::get('/get-patients-to-auth-doctor', [PatientController::class, 'getPatientsToAuthDoctor']);
        Route::get('/get-appointments-count', [DoctorAppointmentController::class, 'getAppointmentsCount']);
        Route::put('/appointment-delete-by-doctor/{id}', [DoctorAppointmentController::class, 'appointmentDeleteByDoctor']);
        Route::put('/appointment-cancel-delete-by-doctor/{id}', [DoctorAppointmentController::class, 'appointmentCancelDeleteByDoctor']);
        Route::get('/get-today-appointments/{id}', [DoctorAppointmentController::class, 'getTodayAppointments']);
        Route::get('/get-patient-data/{id}', [PatientController::class, 'getPatientData']);
        Route::put('/finish-appointment/{id}', [DoctorAppointmentController::class, 'finishAppointment']);
    });

Route::middleware(['auth:sanctum', Patient::class])
    ->group(function () {
        Route::get('/get-appointments-by-doctor', [DoctorAppointmentController::class, 'getAppointmentByDoctor']);
        Route::get('/get-treatments-by-specialization', [GetTreatmentBySpecializationController::class, 'index']);
        Route::get('/test-get-tbs', [SpecializationController::class, 'testGetTBS']);
        Route::get('/appointments', [DoctorAppointmentController::class, 'index']);
        Route::get('/get-treatments', [TreatmentController::class, 'index']);
        Route::get('/get-treatment/{id}', [TreatmentController::class, 'show']);
        //Route::post('/book-appointment', [DoctorAppointmentController::class, 'bookAppointment']);
        Route::get('/user-data', [UserController::class, 'userData']);
        Route::get('/get-appointments-by-patients/{id}', [DoctorAppointmentController::class, 'getAppointmentsByPatients']);
        Route::put('/profile/rate/{id}', [DoctorAppointmentController::class, 'appointmentRating']);
        Route::put('/booking-appointment/{id}', [DoctorAppointmentController::class, 'bookingAppointment']);
        Route::get('/get-all-appointment-by-doctor', [DoctorAppointmentController::class, 'getAllAppointmentByDoctor']);
        Route::put('/cancel-appointment-by-patient/{id}', [PatientController::class, 'cancelAppointmentByPatient']);
        Route::put('/change-user-info/{id}', [UserController::class, 'changeUserInfo']);
        Route::post('/file-upload', [FileController::class, 'store'])->name('file.store');
    });

Route::get('/doctors-with-spec', [DoctorController::class, 'listDoctorsWithSpecialization']);
Route::get('/nav-items', [NavigationRoleController::class, 'getNavItemsByRole']);
Route::get('/get-avg-ratings-by-doctors', [DoctorRatingsViewController::class, 'getAVGRatingsByDoctors']);
Route::get('/treatments', [TreatmentController::class, 'index']);
Route::get('/specializations', [SpecializationController::class, 'index']);
Route::get('/checkLicenceById/{id}', [DoctorLicenceController::class, 'checkLicenceById']);
Route::get('/get-available-appointments', [DoctorAppointmentController::class, 'getAvailableAppointmentsByTreatment']);