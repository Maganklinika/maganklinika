<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new User();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(User::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = new User();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::find($id)->delete();
    }

    function getUsersAndRoles()
    {
        $data = DB::table('users')
            ->join('roles', 'roles.role_id', '=', 'users.role_id')
            ->select('users.id as user_id', 'roles.role_id', 'users.name as user_name', 'roles.name as role_name', 'users.role_id')
            ->get();

        return response()->json($data);
    }

    public function userRoleUpdate(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Felhasználó nem található.'], 404);
        }

        $role = Role::find($request->role_id);
        if (!$role) {
            return response()->json(['error' => 'Szerepkör nem található.'], 404);
        }

        $user->role_id = $request->role_id;
        $user->save();

        return response()->json(['message' => 'Sikeres módosítás', 'user' => $user], 200);
    }

    public function userData()
    {
        $user = Auth::user();

        if ($user->role_id === 2) {
            $doctor = Doctor::where('user_id', $user->id)->first();
            $data = DB::select(
                "SELECT * FROM `users` u 
                INNER JOIN doctors d on d.user_id = u.id
                INNER JOIN specializations s on s.specialization_id = d.specialization_id
                where u.id = {$doctor->user_id}"
            );
            return response()->json($data);
        } elseif ($user->role_id === 3) {
            $patient = Patient::find($user->id);
            $data = DB::select(
                "SELECT * FROM `users` u 
                INNER JOIN patients p on p.user_id = u.id
                where u.id = {$patient->user_id}"
            );
            return response()->json($data);
        } else {
            $u = User::find($user->id);
            $data = DB::select(
                "SELECT * FROM `users` u 
                where u.id = {$u->id}"
            );
            return response()->json($data);
        }
    }

    public function changeUserInfo(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($user->role_id === 2 || $user->role_id === 1) {
            $user->name = $request->name;
            $user->phone_number = $request->phone;
            $user->email = $request->email;
            $user->save();
            return response()->json($user);
        } elseif ($user->role_id === 3) {
            $patient = Patient::find($user->id);
            $user->name = $request->name;
            $user->phone_number = $request->phone;
            $user->email = $request->email;
            $patient->address = $request->address;
            $user->save();
            $patient->save();
            return response()->json([
                'user' => $user,
                'patient' => $patient,
            ]);
        }
    }
}
