<?php

namespace App\Http\Controllers;

use App\Mail\AppointmentStatusUpdated;
use App\Models\DoctorAppointment;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Patient::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new Patient();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Patient::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = new Patient();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Patient::find($id)->delete();
    }
    public function getAllPatientsWithName()
    {
        $data = DB::select("
            SELECT p.user_id as user_id, u.name as user_name, p.taj_number as tn,u.phone_number as u_phone
            FROM users u
            INNER JOIN patients as p on p.user_id = u.id
        ");
        return response()->json($data);
    }
    public function getPatientsToAuthDoctor()
    {
        $doctor = Auth::user()->id;

        $data = DB::select("
            select DISTINCT u.id as user_id, u.name as user_name,p.taj_number as tn ,u.phone_number as u_phone
            from doctor_appointments da
            INNER JOIN users u on u.id = da.patient_id
            INNER JOIN patients p on u.id = p.user_id
            where da.doctor_id = $doctor
        ");
        return response()->json($data);
    }
    public function getPatientData(string $id)
    {
        $data = DB::select(
            "SELECT u.name as name, u.phone_number as phone, u.email as email, p.taj_number as taj, p.birth_date as bd
                FROM `users` u 
                INNER JOIN patients p on p.user_id = u.id
                where u.id = {$id}"
        );
        return response()->json($data);
    }

    public function cancelAppointmentByPatient(string $id)
    {
        $appointment = DoctorAppointment::find($id);
        $previousStatus = $appointment->status;
        if ($appointment->status === "d") {
            return response()->json([
                'message' => 'A kezelést már végbement.',
                'status' => 'error',
            ], 400);
        }

        if ($appointment->status === "v") {
            return response()->json([
                'message' => 'A vizsgálat nem tartozik a pácienshez.',
                'status' => 'error',
            ], 400);
        }



        $appointment->status = "v";

        if ($appointment->status !== $previousStatus) {
            // E-mail küldése a páciensnek
            $user = User::find($appointment->patient_id);
            Mail::to($user->email)->send(new AppointmentStatusUpdated($appointment, $appointment->status));
        }
        $appointment->patient_id = null;
        $appointment->save();

        return response()->json([
            'message' => 'A kezelés sikeresen törölve.',
            'status' => 'success',
            'data' => $appointment
        ], 200);
    }
}
