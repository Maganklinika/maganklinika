<?php

namespace App\Http\Controllers;

use App\Models\DoctorAppointment;
use App\Models\Treatment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


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

    public function createAppointments(Request $request)
    {
        // Adatok validálása
        $request->validate([
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'treatment_name' => 'required|string',
        ]);

        $doctor = Auth::user()->id;

        // Kezelés kiválasztása a kezelés nevéből
        $treatment = Treatment::where('treatment_name', $request->treatment_name)->first();
        if (!$treatment) {
            return response()->json(['error' => 'Kezelés nem található'], 404);
        }

        // Kezdő és befejező időpont
        $startTime = Carbon::parse($request->start_time);
        $endTime = Carbon::parse($request->end_time);

        // Kezelés hossza (time típusú, pl.: 01:00:00)
        $treatmentLength = Carbon::parse($treatment->treatment_length); // 01:00:00 -> Carbon objektum
        $treatmentLengthMinutes = $treatmentLength->hour * 60 + $treatmentLength->minute; // átalakítjuk percbe

        // Kezelések generálása
        $appointments = [];
        $currentStartTime = $startTime;

        // Kezelés időpontok generálása az orvosi rendelési idő alapján
        while (true) {
            $currentEndTime = $currentStartTime->copy()->addMinutes($treatmentLengthMinutes); // Kezelés időpontja

            // Ha a kezelés vége nem lépi túl az endTime-ot
            if ($currentEndTime->greaterThan($endTime)) {
                break;
            }

            // Kezelés hozzáadása
            $appointments[] = [
                'doctor_id' => $doctor, // Bejelentkezett orvos ID-ja
                'start_time' => $currentStartTime,
                'treatment_id' => $treatment->treatment_id,
                'patient_id' => null,
                'status' => 'v', // vacant státusz
            ];

            // Kezelés utáni szünet: 10 perc
            $currentStartTime = $currentEndTime->addMinutes(10); // Kezelés utáni 10 perces szünet
        }

        // Az utolsó kezelés, ha túlcsúszik, eltávolítása
        if ($currentStartTime->greaterThan($endTime)) {
            array_pop($appointments); // Az utolsó kezelést eltávolítjuk, ha már nem fér bele
        }

        // Adatok mentése az appointments táblába
        DoctorAppointment::insert($appointments);

        return response()->json(['message' => 'Kezelések sikeresen létrehozva'], 200);
    }
}
