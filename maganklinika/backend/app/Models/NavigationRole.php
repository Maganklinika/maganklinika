<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NavigationRole extends Model
{
    /** @use HasFactory<\Database\Factories\NavigationRoleFactory> */
    use HasFactory;

    protected  $primaryKey = 'navigationRole_id';

    protected $fillable = [
        'ranking',
        'role_id',
        'navigation_id',
    ];

    // A NavigationRole egy szerepkörhöz tartozik
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'role_id');
    }

    // A NavigationRole egy navigációs elemhez tartozik
    public function navigation()
    {
        return $this->belongsTo(Navigation::class, 'navigation_id', 'navigation_id');
    }
}
