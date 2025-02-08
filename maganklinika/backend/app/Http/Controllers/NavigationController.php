<?php

namespace App\Http\Controllers;

use App\Models\Navigation;
use App\Http\Requests\StoreNavigationRequest;
use App\Http\Requests\UpdateNavigationRequest;

class NavigationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNavigationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Navigation $navigation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNavigationRequest $request, Navigation $navigation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Navigation $navigation)
    {
        //
    }
}
