<?php

use App\Models\Listing;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create an authenticated user
    $this->user = User::factory()->create();
    $this->actingAs($this->user, 'sanctum');

    // Create categories
    $this->category1 = Category::factory()->create(['name' => 'Electronics']);
    $this->category2 = Category::factory()->create(['name' => 'Clothing']);
    $this->category3 = Category::factory()->create(['name' => 'Books']);

    // Create subcategories
    $this->subcategory1 = $this->category1->subcategories()->create(['name' => 'Laptops']);
    $this->subcategory2 = $this->category2->subcategories()->create(['name'  => 'Shirts']);
    $this->subcategory3 = $this->category3->subcategories()->create(['name'  => 'Programming']);

    // Create products
    Listing::factory()->create([
        'title' => 'Laptop',
        'description' => 'A powerful laptop',
        'price' => 1000,
        'subcategory_id' => $this->subcategory1->id
    ]);

    Listing::factory()->create([
        'name' => 'Shirt',
        'description' => 'A stylish shirt',
        'price' => 50,
        'subcategory_id' => $this->subcategory2->id
    ]);

    Listing::factory()->create([
        'name' => 'PHP Book',
        'description' => 'Learn PHP programming',
        'price' => 30,
        'subcategory_id' => $this->subcategory3->id
    ]);
});

it('requires authentication to access listings', function () {
    // Log out the user
    auth()->logout();

    $response = $this->getJson('/api/listings');
    $response->assertStatus(401);
});

it('returns all listings', function () {
    $response = $this->getJson('/api/listings');

    $response->assertStatus(200)
             ->assertJsonCount(2, 'data')
             ->assertJsonStructure([
                 'data' => [
                     '*' => ['id', 'name', 'price', 'description', 'subcategory_id', 'seller_id', 'status', 'created_at', 'updated_at']
                 ]
             ]);
});
