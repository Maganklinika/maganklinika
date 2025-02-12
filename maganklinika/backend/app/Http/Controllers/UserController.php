<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
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
        // Ellenőrizzük, hogy a felhasználó létezik-e
        $user = User::find($id);  // Itt az $id a felhasználó azonosítója az URL-ből
        if (!$user) {
            return response()->json(['error' => 'Felhasználó nem található.'], 404);
        }

        // Ellenőrizzük, hogy létezik-e a szerepkör id, amit a body-ban kaptunk
        $role = Role::find($request->role_id);  // Itt az $request->id a role_id-t reprezentálja
        if (!$role) {
            return response()->json(['error' => 'Szerepkör nem található.'], 404);
        }

        // Módosítjuk a felhasználó szerepkörét
        $user->role_id = $request->role_id;
        $user->save();

        return response()->json(['message' => 'Sikeres módosítás', 'user' => $user], 200);
    }
}
