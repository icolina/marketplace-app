<?php

namespace Database\Factories;

use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'seller_id' => User::factory(),
            'subcategory_id' => Subcategory::factory(),
            'title' => fake()->name(),
            'description' => fake()->text(),
            'price' => fake()->randomFloat(2, 10, 1000000),
        ];
    }
}
