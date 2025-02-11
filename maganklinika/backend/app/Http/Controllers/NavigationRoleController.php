<?php

namespace App\Http\Controllers;

use App\Models\NavigationRole;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

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
            'nav_id' => 'required|integer|exists:navs,id',  // Validáció, hogy a nav_id létezzen a navs táblában
            'role_name' => 'required|string',  // Validáljuk a role_name-t
        ]);

        // A role_id-t a role_name alapján
        $role = Role::where('megnevezes', $validated['role_name'])->first();

        // Ha nem találjuk a szerepkört
        if (!$role) {
            return response()->json(['error' => 'Role not found.'], 404);
        }

        // Ellenőrizzük, hogy a nav_id és role_id páros már létezik
        $exists = NavigationRole::where('nav_id', $validated['nav_id'])
            ->where('role_id', $role->id)
            ->exists();

        // Visszaadjuk az eredményt
        return response()->json(['exists' => $exists]);
    }

    public function addNavToRole(Request $request)
    {
        // Validáljuk a bemeneti adatokat
        $validated = $request->validate([
            'nav_id' => 'required|integer|exists:navs,id',  // Validáció, hogy a nav_id létezzen a navs táblában
            'role_name' => 'required|string',  // Validáljuk a role_name-t
        ]);

        // A role_name alapján megszerezzük a role_id-t
        $role = Role::where('megnevezes', $validated['role_name'])->first();

        // Ha nem találunk ilyen role-t, hibát jelezünk
        if (!$role) {
            return response()->json(['error' => 'Role not found.'], 404);
        }

        // Ha a role_id megvan, akkor folytatjuk az adatbázis műveleteket
        $NavigationRole = new NavigationRole();
        $NavigationRole->nav_id = $validated['nav_id'];
        $NavigationRole->role_id = $role->id;  // A role_id hozzárendelése a role_name alapján
        $NavigationRole->parent = null;  // Beállítjuk a parent mezőt (ha szükséges, itt kezelhetjük)

        // A legmagasabb sorszám +1 beállítása
        $maxSorszam = NavigationRole::where('role_id', $role->id)->max('sorszam');
        $NavigationRole->sorszam = $maxSorszam + 1;

        // Mentjük az új NavigationRole rekordot
        $NavigationRole->save();

        return response()->json($NavigationRole);
    }



    public function getNavItemsByRole()
    {
        // Ellenőrizzük, hogy van-e bejelentkezett felhasználó
        $roleId = Auth::check() ? Auth::user()->role_id : 4; // Ha nincs bejelentkezett felhasználó, akkor vendég szerepkör (role_id = 4)

        // Lekérjük a menüpontokat a megadott szerepkörhöz
        $navItems = DB::table('nav_roles')
            ->join('navs', 'navs.id', '=', 'nav_roles.nav_id')
            ->where('nav_roles.role_id', $roleId)
            ->orderBy('nav_roles.sorszam')
            ->select('navs.megnevezes', 'navs.url', 'componentName')
            ->get();

        return response()->json($navItems)->header('Cache-Control', 'no-cache, no-store, must-revalidate');
    }

    public function getNavItemsWithRoles()
    {
        // Ellenőrizzük, hogy van-e bejelentkezett felhasználó
        // Lekérjük a menüpontokat és szerepköröket az adatbázisból, a megfelelő kapcsolatokat kezelve
        $navItems = DB::table('nav_roles')
            ->join('navs', 'navs.id', '=', 'nav_roles.nav_id')
            ->join('roles', 'roles.id', '=', 'nav_roles.role_id')
            ->orderBy('nav_roles.sorszam')
            ->select('nav_roles.id', 'roles.megnevezes as role_name', 'navs.megnevezes as nav_name', 'navs.id as nav_id', 'roles.id as role_id', 'nav_roles.sorszam')
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
                if (!isset($item['id']) || !isset($item['sorszam'])) {
                    return response()->json(['error' => 'Missing "id" or "sorszam" key in item'], 400);
                }

                // A sorszám újra kiadása, hogy a helyes sorrendben legyenek
                DB::table('nav_roles')
                    ->where('id', $item['id'])
                    ->update(['sorszam' => $index + 1]); // Az index alapján módosítjuk a sorszámot
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
