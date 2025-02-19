<?php

namespace App\Http\Controllers;

use App\Models\DoctorAppointment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class DoctorAppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(DoctorAppointment::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new DoctorAppointment();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(DoctorAppointment::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = new DoctorAppointment();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DoctorAppointment::find($id)->delete();
    }

    public function getAllAppointmentByDoctor()
    {
        $doctor = Auth::user()->id;

        $result = DB::select("
            SELECT *
            FROM doctor_appointments
            WHERE doctor_id = $doctor
        ");
        return $result;
    }
}
