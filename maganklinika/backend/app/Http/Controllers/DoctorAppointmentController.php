<?php

namespace App\Http\Controllers;

use App\Mail\AppointmentStatusUpdated;
use App\Models\DoctorAppointment;
use App\Models\Treatment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DoctorAppointmentController extends Controller
{
    public function index()
    {
        return response()->json(DoctorAppointment::all());
    }

    public function store(Request $request)
    {
        $data = new DoctorAppointment();
        $data->fill($request->all());
        $data->save();
    }

    public function show(string $id)
    {
        return response()->json(DoctorAppointment::find($id));
    }

    public function update(Request $request, string $id)
    {
        $data = new DoctorAppointment();
        $data->fill($request->all());
        $data->save();
    }

    public function destroy(string $id)
    {
        DoctorAppointment::find($id)->delete();
    }

    public function getAppointmentByDoctor(Request $request)
    {
        $doctorId = $request->input('doctor_id');

        if (!$doctorId) {
            return response()->json(['error' => 'Doctor ID is required'], 400);
        }

        $appointments = DoctorAppointment::with('treatment')
            ->where('doctor_id', $doctorId)
            ->where('status', 'v')
            ->get();
        return response()->json($appointments);
    }

    public function getAllAppointmentByDoctor(Request $request)
    {
        $doctorId = $request->input('doctor_id');

        if (!$doctorId) {
            return response()->json(['error' => 'Doctor ID is required'], 400);
        }

        $appointments = DoctorAppointment::with('treatment')
            ->where('doctor_id', $doctorId)
            ->get();
        return response()->json($appointments);
    }

    public function createAppointments(Request $request)
    {
        $request->validate([
            'start_time' => 'required|date',
            'end_time' => 'required|date',
            'treatment_name' => 'required|string',
        ]);

        $doctor = Auth::user()->id;

        $treatment = Treatment::where('treatment_name', $request->treatment_name)->first();
        if (!$treatment) {
            return response()->json(['error' => 'Kezelés nem található'], 404);
        }

        $startTime = Carbon::parse($request->start_time);
        $endTime = Carbon::parse($request->end_time);

        $treatmentLength = Carbon::parse($treatment->treatment_length);
        $treatmentLengthMinutes = $treatmentLength->hour * 60 + $treatmentLength->minute;

        $appointments = [];
        $currentStartTime = $startTime;

        while (true) {
            $currentEndTime = $currentStartTime->copy()->addMinutes($treatmentLengthMinutes);

            if ($currentEndTime->greaterThan($endTime)) {
                break;
            }

            $appointments[] = [
                'doctor_id' => $doctor,
                'start_time' => $currentStartTime,
                'treatment_id' => $treatment->treatment_id,
                'patient_id' => null,
                'status' => 'v',
            ];

            $currentStartTime = $currentEndTime->addMinutes(10);
        }

        if ($currentStartTime->greaterThan($endTime)) {
            array_pop($appointments);
        }

        DoctorAppointment::insert($appointments);

        return response()->json(['message' => 'Kezelések sikeresen létrehozva'], 200);
    }

    public function getAppointmentsCount()
    {
        $data = DB::select("
            select p.user_id as u_id ,count(*) as da_number
            from doctor_appointments da
            INNER join patients p on p.user_id=da.patient_id
            WHERE da.status = 'd'
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

        $previousStatus = $appointment->status;
        if (!$appointment) {
            return response()->json(['error' => 'Ez az időpont már foglalt vagy nem létezik'], 400);
        }


        $appointment->status = 'b';
        $appointment->patient_id = $request->patient_id;
        $appointment->save();

        if ($appointment->status !== $previousStatus) {
            Mail::to($appointment->patient->email)->send(new AppointmentStatusUpdated($appointment, $appointment->status));
        }

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
        $record = DoctorAppointment::find($id);
        $previousStatus = $record->status;

        if (!$record) {
            return response()->json([
                'message' => 'Nem található ilyen időpont.',
                'status' => 'error'
            ], 404);
        }

        if ($record->status === 'c') {
            return response()->json([
                'message' => 'Ez az időpont már törölve lett.',
                'status' => 'error'
            ], 400);
        }

        $record->status = 'c';
        $record->save();

        if ($record->status !== $previousStatus) {
            $user = User::find($record->patient_id);
            Mail::to($user->email)->send(new AppointmentStatusUpdated($record, $record->status));
        }

        return response()->json([
            'message' => 'Az időpont törölve lett az orvos által.',
            'status' => 'success',
            'data' => $record
        ], 200);
    }

    public function appointmentCancelDeleteByDoctor(string $id)
    {

        $record = DoctorAppointment::find($id);
        $previousStatus = $record->status;

        if (!$record) {
            return response()->json([
                'message' => 'Nem található ilyen időpont.',
                'status' => 'error'
            ], 404);
        }

        if ($record->status === 'v') {
            return response()->json([
                'message' => 'Ez az időpont szabad.',
                'status' => 'error'
            ], 400);
        }

        if ($record->patient_id !== null) {
            $record->status = 'b';

            if ($record->status !== $previousStatus) {
                $user = User::find($record->patient_id);
                Mail::to($user->email)->send(new AppointmentStatusUpdated($record, $record->status));
            }
        } else {
            $record->status = 'v';
        }
        $record->save();

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
                'message' => 'Sikeres értékelés.',
                'status' => 'success',
                'data' => $appointment
            ], 200);
        } else {
            return response()->json([
                'message' => 'Nem értékelhető foglalás.',
                'status' => 'error',
            ], 400);
        }
    }

    public function bookingAppointment(string $id)
    {
        $appointment = DoctorAppointment::find($id);
        $patient = Auth::user();
        $previousStatus = $appointment->status;
        if ($appointment->status === 'b') {
            return response()->json([
                'message' => 'Az időpont már foglalt.',
                'status' => 'error',
            ], 400);
        }

        if ($appointment->status === 'd') {
            return response()->json([
                'message' => 'A vizsgálat már lezajlott.',
                'status' => 'error',
            ], 400);
        }

        if ($appointment->status === 'c') {
            return response()->json([
                'message' => 'Orvos által törölt vizsgálat.',
                'status' => 'error',
            ], 400);
        }

        $appointment->status = 'b';
        $appointment->patient_id = $patient->id;
        $appointment->save();

        if ($appointment->status !== $previousStatus) {
            $user = User::find($appointment->patient_id);
            Mail::to($user->email)->send(new AppointmentStatusUpdated($appointment, $appointment->status));
        }

        return response()->json([
            'message' => 'Az időpont sikeresen lefoglalva.',
            'status' => 'success',
            'data' => $appointment
        ], 200);
    }

    public function getTodayAppointments(string $doctorId)
    {
        return DB::table('doctor_appointments')
            ->join('treatments', 'doctor_appointments.treatment_id', '=', 'treatments.treatment_id')
            ->leftJoin('users as patients', 'doctor_appointments.patient_id', '=', 'patients.id')
            ->select(
                DB::raw("TIME(doctor_appointments.start_time) as treatment_time"),
                'patients.name as patient_name',
                'treatments.treatment_name',
                'doctor_appointments.id as da_id',
                'patients.id as p_id'
            )
            ->whereDate('doctor_appointments.start_time', Carbon::today())
            ->where('doctor_appointments.doctor_id', $doctorId)
            ->get();
    }

    public function finishAppointment(string $id, Request $request)
    {
        $appointment = DoctorAppointment::find($id);
        $previousStatus = $appointment->status;

        if ($appointment->patient_id === null) {
            return response()->json([
                'message' => 'Nem történt foglalás az időpontra.',
                'status' => 'error',
            ], 400);
        }

        if ($appointment->status === 'd') {
            return response()->json([
                'message' => 'A vizsgálatot már lezárták.',
                'status' => 'error',
            ], 400);
        }

        $appointment->status = 'd';
        $appointment->description = $request->description;
        $appointment->save();

        if ($appointment->status !== $previousStatus) {
            $user = User::find($appointment->patient_id);
            Mail::to($user->email)->send(new AppointmentStatusUpdated($appointment, $appointment->status));
        }


        return response()->json([
            'message' => 'A kezelés sikeresen el lett végezve',
            'status' => 'success',
            'data' => $appointment
        ], 200);
    }
}
