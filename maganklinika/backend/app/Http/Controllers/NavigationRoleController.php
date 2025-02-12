<?php

namespace App\Http\Controllers;

use App\Models\NavigationRole;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class NavigationRoleController extends Controller
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

    public function destroy($id)
    {
        // Keresés a NavigationRole táblában az id alapján
        $NavigationRole = NavigationRole::find($id);

        // Ha nem található, 404-es hiba
        if (!$NavigationRole) {
            return response()->json(['message' => 'NavigationRole not found'], 404);
        }

        // Törlés
        $NavigationRole->delete();

        // Válasz visszaküldése
        return response()->json(['message' => 'NavigationRole deleted successfully'], 200);
    }

    public function checkNavAssignedToRole(Request $request)
    {
        $validated = $request->validate([
            'navigation_id' => 'required|integer|exists:navigations,navigation_id',  // Validáció, hogy a nav_id létezzen a navigations táblában
            'name' => 'required|string',  // Validáljuk a role_name-t
        ]);

        // A role_id-t a role_name alapján
        $role = Role::where('name', $validated['name'])->first();

        // Ha nem találjuk a szerepkört
        if (!$role) {
            return response()->json(['error' => 'Role not found.'], 404);
        }

        // Ellenőrizzük, hogy a nav_id és role_id páros már létezik
        $exists = NavigationRole::where('navigation_id', $validated['navigation_id'])
            ->where('role_id', $role->role_id)
            ->exists();

        // Visszaadjuk az eredményt
        return response()->json(['exists' => $exists]);
    }

    public function addNavToRole(Request $request)
    {
        // Validáljuk a bemeneti adatokat
        $validated = $request->validate([
            'navigation_id' => 'required|integer|exists:navigations,navigation_id',  // Validáció, hogy a nav_id létezzen a navigations táblában
            'name' => 'required|string',  // Validáljuk a role_name-t
        ]);

        // A role_name alapján megszerezzük a role_id-t
        $role = Role::where('name', $validated['name'])->first();

        // Ha nem találunk ilyen role-t, hibát jelezünk
        if (!$role) {
            return response()->json(['error' => 'Role not found.'], 404);
        }

        // Ha a role_id megvan, akkor folytatjuk az adatbázis műveleteket
        $NavigationRole = new NavigationRole();
        $NavigationRole->navigation_id = $validated['navigation_id'];
        $NavigationRole->role_id = $role->role_id;  // A role_id hozzárendelése a role_name alapján

        // A legmagasabb sorszám +1 beállítása
        $maxranking = NavigationRole::where('role_id', $role->role_id)->max('ranking');
        $NavigationRole->ranking = $maxranking + 1;

        // Mentjük az új NavigationRole rekordot
        $NavigationRole->save();

        return response()->json($NavigationRole);
    }



    public function getNavItemsByRole()
    {
        // Ellenőrizzük, hogy van-e bejelentkezett felhasználó
        $roleId = Auth::check() ? Auth::user()->role_id : 4; // Ha nincs bejelentkezett felhasználó, akkor vendég szerepkör (role_id = 4)

        // Lekérjük a menüpontokat a megadott szerepkörhöz
        $navItems = DB::table('navigation_roles')
            ->join('navigations', 'navigations.navigation_id', '=', 'navigation_roles.navigation_id')
            ->where('navigation_roles.role_id', $roleId)
            ->orderBy('navigation_roles.ranking')
            ->select('navigations.name', 'navigations.url', 'component_name')
            ->get();

        return response()->json($navItems)->header('Cache-Control', 'no-cache, no-store, must-revalidate');
    }

    public function getNavItemsWithRoles()
    {
        // Ellenőrizzük, hogy van-e bejelentkezett felhasználó
        // Lekérjük a menüpontokat és szerepköröket az adatbázisból, a megfelelő kapcsolatokat kezelve
        $navItems = DB::table('navigation_roles')
            ->join('navigations', 'navigations.navigation_id', '=', 'navigation_roles.navigation_id')
            ->join('roles', 'roles.role_id', '=', 'navigation_roles.role_id')
            ->orderBy('navigation_roles.ranking')
            ->select('navigation_roles.navigationRole_id as navRole_id' , 'roles.name as role_name', 'navigations.name as nav_name', 'navigations.navigation_id as nav_id', 'roles.role_id as role_id', 'navigation_roles.ranking')
            ->get();

        return response()->json($navItems)->header('Cache-Control', 'no-cache, no-store, must-revalidate');
    }

    public function updateNavOrder(Request $request)
    {
        // Kezdjük el a tranzakciót
        DB::beginTransaction();

        try {
            $items = $request->input('items');
            if (!$items) {
                return response()->json(['error' => 'No items provided'], 400);
            }

            // 1. Módosítsuk a sorszámokat, és frissítsük az adatokat
            foreach ($items as $index => $item) {
                if (!isset($item['id']) || !isset($item['ranking'])) {
                    return response()->json(['error' => 'Missing "id" or "ranking" key in item'], 400);
                }

                // A sorszám újra kiadása, hogy a helyes sorrendben legyenek
                DB::table('navigation_roles')
                    ->where('navigationRole_id', $item['id'])
                    ->update(['ranking' => $index + 1]); // Az index alapján módosítjuk a sorszámot
            }

            // Ha minden rendben van, akkor commit-áljuk a tranzakciót
            DB::commit();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            // Hiba esetén visszavonjuk a tranzakciót
            DB::rollBack();
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}
