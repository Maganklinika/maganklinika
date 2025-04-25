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
        $role = Role::where('name', $request->selectedValue)->value('role_id');

        $rules = ([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        if ($role == 3) {
            $rules['taj_number'] = ['required', 'digits:9', 'unique:' . Patient::class . ',taj_number'];
        } else {
            $rules['taj_number'] = ['nullable'];
        }

        $request->validate($rules);


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'role_id' => $role,
        ]);


        if ($request->selectedValue === "patient") {
            Patient::create([
                'taj_number' => $request->taj_number,
                'address' => $request->address,
                'birth_date' => $request->birth_date,
                'user_id' => $user->id,
            ]);
        } else if ($request->selectedValue === "doctor") {
            Doctor::create([
                'user_id' => $user->id,
                'specialization_id' => $request->specialization_id,
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}
