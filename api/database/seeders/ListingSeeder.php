<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Models\ListingPhoto;
use App\Models\Subcategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subcategories = Subcategory::all();

        foreach ($subcategories as $subcategory) {
            // Create between 1 to 5 listings for each subcategory and each listing has 2 to 5 photos
            Listing::factory()
                ->count(rand(1, 5))
                ->has(ListingPhoto::factory()->count(rand(2, 5)), 'photos')
                ->create([
                    'subcategory_id' => $subcategory->id,
                ]);
        }
    }
}
