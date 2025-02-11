<?php

namespace App\Http\Controllers;

use App\Models\Navigation;
use App\Services\NavigationService;
use Illuminate\Support\Facades\Request;

class NavigationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Navigation::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new Navigation();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Navigation::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = new Navigation();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Navigation::find($id)->delete();
    }
}
