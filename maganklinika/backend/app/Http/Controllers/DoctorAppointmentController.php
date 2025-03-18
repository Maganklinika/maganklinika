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

        $appointments = DoctorAppointment::with('treatment')
            ->where('doctor_id', $doctorId)
            ->where('status', 'v')
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
            select p.user_id as u_id,da.start_time as time, t.treatment_name as t_name, da.status as da_status, u.name as user_name, da.rating as rating, da.id as id
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

    public function getAvailableAppointmentsByTreatment(Request $request)
    {
        $treatmentId = $request->input('treatment_id');

        if (!$treatmentId) {
            return response()->json(['error' => 'Treatment ID is required'], 400);
        }

        $availableAppointments = DoctorAppointment::where('treatment_id', $treatmentId)
            ->where('status', 'v')
            ->orderBy('start_time', 'asc')
            ->get();

        return response()->json($availableAppointments);
    }

    public function appointmentDeleteByDoctor(string $id)
    {

        // Keresd ki a rekordot
        $record = DoctorAppointment::find($id);

        // Ha nem található, térj vissza hibával
        if (!$record) {
            return response()->json([
                'message' => 'Nem található ilyen időpont.',
                'status' => 'error'
            ], 404);
        }

        // Ha már törölték, ne frissítsük újra
        if ($record->status === 'c') {
            return response()->json([
                'message' => 'Ez az időpont már törölve lett.',
                'status' => 'error'
            ], 400);
        }

        // Status frissítése
        $record->status = 'c';
        $record->save();

        // Sikeres válasz visszaadása
        return response()->json([
            'message' => 'Az időpont törölve lett az orvos által.',
            'status' => 'success',
            'data' => $record
        ], 200);
    }

    public function appointmentCancelDeleteByDoctor(string $id)
    {

        // Keresd ki a rekordot
        $record = DoctorAppointment::find($id);

        // Ha nem található, térj vissza hibával
        if (!$record) {
            return response()->json([
                'message' => 'Nem található ilyen időpont.',
                'status' => 'error'
            ], 404);
        }

        // Ha már törölték, ne frissítsük újra
        if ($record->status === 'v') {
            return response()->json([
                'message' => 'Ez az időpont szabad.',
                'status' => 'error'
            ], 400);
        }

        // Status frissítése
        $record->status = 'v';
        $record->save();

        // Sikeres válasz visszaadása
        return response()->json([
            'message' => 'Az időpont vissza lett állítva szabadra.',
            'status' => 'success',
            'data' => $record
        ], 200);
    }

    
    public function appointmentRating(string $id, Request $request)
    {
        $appointment = DoctorAppointment::find($id);
        if ($appointment->status === 'd' && $appointment->rating === null) {
            $appointment->rating = $request->rating;
            $appointment->save();
            return response()->json([
                'message' => 'Rögzült jee.',
                'status' => 'success',
                'data' => $appointment
            ], 200);

        } else {return response()->json([
            'message' => 'Nem értékelhető foglalás.',
            'status' => 'error',
        ], 400);}

    }

    public function bookingAppointment(string $id){
        $appointment = DoctorAppointment::find($id);
        if($appointment -> status === 'b') {
            return response()->json([
                'message' => 'Az időpont már foglalt.',
                'status' => 'error',
            ], 400);
        }

        if($appointment -> status === 'd') {
            return response()->json([
                'message' => 'A vizsgálat már lezajlott.',
                'status' => 'error',
            ], 400);
        }

        if($appointment -> status === 'c') {
            return response()->json([
                'message' => 'Orvos által törölt vizsgálat.',
                'status' => 'error',
            ], 400);
        }

        $appointment->status = 'b';
        $appointment->save();
        return response()->json([
            'message' => 'Az időpont sikeresen lefoglalva.',
            'status' => 'success',
            'data' => $appointment
        ], 200);
    }
}
