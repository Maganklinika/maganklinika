<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            select u.id as user_id, u.name as user_name,p.taj_number as tn ,u.phone_number as u_phone
            from doctor_appointments da
            INNER JOIN users u on u.id = da.patient_id
            INNER JOIN patients p on u.id = p.user_id
            where da.doctor_id = $doctor
        ");
        return response()->json($data);

    }

    
}
