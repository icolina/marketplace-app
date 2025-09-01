<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name'];

    /**
     * Get the subcategories for the category.
     */
    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }
}
