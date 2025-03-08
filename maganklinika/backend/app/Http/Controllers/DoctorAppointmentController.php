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

    public function getAllAppointmentByDoctor(Request $request)
    {
        $doctorId = $request->input('doctor_id'); // A doktor ID-t a kérésből vesszük

        if (!$doctorId) {
            return response()->json(['error' => 'Doctor ID is required'], 400); // Ha nincs doctor_id, visszaadunk egy hibaüzenetet
        }

        $appointments = DoctorAppointment::with(['treatment', 'patient'])
            ->where('doctor_id', $doctorId)
            ->get();
        return response()->json($appointments);
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

    public function getAppointmentsCount()
    {
        $data = DB::select("
            select p.user_id as u_id ,count(*) as da_number
            from doctor_appointments da
            INNER join patients p on p.user_id=da.patient_id
            GROUP by p.user_id
        ");
        return response()->json($data);
    }

    public function getAppointmentsByPatients(string $id)
    {
        $data = DB::select("
            select p.user_id as u_id,da.start_time as time, t.treatment_name as t_name, da.status as da_status, u.name as user_name
            from doctor_appointments as da
            inner join patients as p on da.patient_id = p.user_id
            inner join doctors as d on d.user_id = da.doctor_id
            inner join users as u on u.id=d.user_id
            inner join treatments as t on t.treatment_id = da.treatment_id
            where p.user_id=$id
        ");

        return response()->json($data);
    }

    public function bookAppointment(Request $request)
{

    $request->validate([
        'doctor_id' => 'required|exists:doctors,user_id',
        'start_time' => 'required|date|exists:doctor_appointments,start_time',
        'patient_id' => 'required|exists:patients,user_id',
    ]);


    $appointment = DoctorAppointment::where('doctor_id', $request->doctor_id)
        ->where('start_time', $request->start_time)
        ->where('status', 'v')
        ->first();


    if (!$appointment) {
        return response()->json(['error' => 'Ez az időpont már foglalt vagy nem létezik'], 400);
    }


    $appointment->status = 'b';
    $appointment->patient_id = $request->patient_id;
    $appointment->save();

    return response()->json(['message' => 'Foglalás sikeres!', 'appointment' => $appointment], 200);
}
}
