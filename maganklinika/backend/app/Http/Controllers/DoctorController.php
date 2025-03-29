<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Doctor::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new Doctor();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Doctor::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = new Doctor();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Doctor::find($id)->delete();
    }

    public function listDoctorsWithSpecialization()
    {
        $data = DB::select("
            SELECT DISTINCT u.name as d_name, s.specialization_name as s_name, u.email, u.profile_picture as img
            FROM doctors as d
            INNER JOIN users as u on d.user_id = u.id
            INNER JOIN specializations as s on d.specialization_id = s.specialization_id
            order by u.name, s.specialization_name
        ");
        return response()->json($data);
    }
}
