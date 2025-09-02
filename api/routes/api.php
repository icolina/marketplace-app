<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\SubcategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/user', function () {
        return auth()->user();
    })->name('user');

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('subcategories', SubcategoryController::class);
    Route::apiResource('listings', ListingController::class);

    Route::get('/my-listings', [ListingController::class, 'myListings'])->name('my-listings');
});
