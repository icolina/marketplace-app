<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Home & Garden' => ['Tools', 'Furniture', 'Household', 'Garden', 'Appliances'],
            'Entertainment' => ['Video Games', 'Books, Movies & Music'],
            'Clothing & Accessories' => ['Bags & Luggage', "Women's clothing & shoes", "Men's clothing & shoes", 'Jewelry & Accessories'],
            'Family' => ['Health & Beauty', 'Pet Supplies', 'Baby & Kids', 'Toys & Games'],
            'Electronics' => ['Electronics & computers', 'Mobile phones'],
            'Hobbies' => ['Bicycles', 'Arts & Crafts', 'Sports & Outdoors', 'Auto parts', 'Musical Instruments', 'Antiques & Collectibles'],
            'Classified' => ['Garage Sale', 'Miscellaneous'],
            'Vehicles' => ['Car', 'Motorcycle', 'Truck'],
        ];

        foreach ($categories as $categoryName => $subcategories) {
            $category = Category::where('name', $categoryName)->first();

            if ($category) {
                foreach ($subcategories as $subcategory) {
                    Subcategory::create([
                        'name' => $subcategory,
                        'category_id' => $category->id,
                    ]);
                }
            }
        }
    }
}
