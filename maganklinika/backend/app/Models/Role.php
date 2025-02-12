<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;

    protected  $primaryKey = 'role_id';

    protected $fillable = [
        'name',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id', 'role_id');
    }

    public function navigationRoles()
    {
        return $this->hasMany(NavigationRole::class, 'role_id', 'role_id');
    }

    public static function run()
    {
        // Manuálisan hozzuk létre az id-kat, hogy 1-től 4-ig terjedjenek
        Role::create(['role_id' => 1, 'name' => 'admin']);
        Role::create(['role_id' => 2, 'name' => 'doctor']);
        Role::create(['role_id' => 3, 'name' => 'patient']);
        Role::create(['role_id' => 4, 'name' => 'guest']);
    }
}
