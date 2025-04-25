<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'taj_number' => ['required_if:selectedValue,patient', 'number', 'digits:9', 'unique:' . Patient::class . ',taj_number'],
        ]);


        $role = Role::where('name', $request->selectedValue)->value('role_id');



        // 2️⃣ Hozd létre a felhasználót, és győződj meg róla, hogy mentésre kerül
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'role_id' => $role,
        ]);



        // 4️⃣ Ha patient, hozz létre egy Patient rekordot
        if ($request->selectedValue === "patient") {
            Patient::create([
                'taj_number' => $request->taj_number,
                'address' => $request->address,
                'birth_date' => $request->birth_date,
                'user_id' => $user->id, // ✔ Most már biztosan van ID
            ]);
        }
        // 5️⃣ Ha doctor, hozz létre egy Doctor rekordot
        else if ($request->selectedValue === "doctor") {
            Doctor::create([
                'user_id' => $user->id, // ✔ Most már biztosan van ID
                'specialization_id' => $request->specialization_id,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}
