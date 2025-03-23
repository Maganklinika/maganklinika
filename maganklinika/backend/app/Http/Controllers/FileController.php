<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller
{
    public function index()
    {
        return view('fileUpload');
    }

    public function store(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|mimes:jpg,png,jpeg,mp4,webp,gif|max:20480',
        ]);

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('profile_pictures', $fileName, 'public');

            $user = Auth::user(); // Aktuálisan bejelentkezett felhasználó
            $user->profile_picture = $filePath;
            $user->save();

            $url = asset('storage/' . $filePath);

            return response()->json([
                'message' => 'Profilkép sikeresen feltöltve!',
                'url' => $url
            ]);
        }

        return response()->json(['error' => 'A fájlfeltöltés sikertelen!'], 400);
    }
}
