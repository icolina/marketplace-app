<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'seller_id',
        'subcategory_id',
        'title',
        'description',
        'price',
        'status',
    ];

    /**
     * Get the user that owns the listing.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'seller_id');
    }

    /**
     * Get the subcategory that owns the listing.
     */
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    /**
     * Get the category that owns the listing through the subcategory.
     */
    public function category()
    {
        return $this->subcategory->category();
    }

    /**
     * Get the photos for the listing.
     */
    public function photos()
    {
        return $this->hasMany(ListingPhoto::class);
    }
}
