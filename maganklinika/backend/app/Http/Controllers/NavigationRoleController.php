<?php

namespace App\Http\Controllers;

use App\Models\NavigationRole;
use Illuminate\Support\Facades\Request;

class NavigationRoleRoleController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(NavigationRole::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = new NavigationRole();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(NavigationRole::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = new NavigationRole();
        $data->fill($request->all());
        $data->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        NavigationRole::find($id)->delete();
    }
}
