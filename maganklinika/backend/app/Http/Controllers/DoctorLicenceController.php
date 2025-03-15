<?php

namespace App\Http\Controllers;

use App\Models\DoctorLicence;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DoctorLicenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function checkLicenceById(string $id): JsonResponse
    {
        $licence = DoctorLicence::where('licence_number', $id)->first();

        if (!$licence) {
            return response()->json([
                'message' => 'Nincs ilyen licensz a rendszerben',
                'statusText' => 'NOK'
            ], 200);
        }

        if ($licence->isUsed) {
            return response()->json([
                'message' => 'A licenszet már felhasználták.',
                'statusText' => 'NOK'
            ], 200);
        }

        $licence->isUsed = true;
        $licence->save();

        return response()->json([
            'statusText' => 'OK',
            'data' => $licence
        ], 200);
    }
}
