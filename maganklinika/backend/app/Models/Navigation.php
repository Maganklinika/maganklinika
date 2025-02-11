<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Navigation extends Model
{
    /** @use HasFactory<\Database\Factories\NavigationFactory> */
    use HasFactory;

    protected  $primaryKey = 'navigation_id';

    protected $fillable = [
        'name',
        'URL',
        'component_name',
        'parent',
    ];

    // Egy navigációs elem több NavigationRole rekordhoz is tartozhat
    public function navigationRoles()
    {
        return $this->hasMany(NavigationRole::class, 'navigation_id', 'navigation_id');
    }
}
