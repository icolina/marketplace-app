<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Http\Requests\Api\StoreListingRequest;
use App\Http\Requests\Api\UpdateListingRequest;
use App\Http\Resources\ListingResource;
use Illuminate\Support\Facades\Log;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listings = Listing::with(['seller', 'subcategory.category', 'photos'])
            ->where('status', 'active')
            ->get();

        return ListingResource::collection($listings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListingRequest $request)
    {
        $listing = Listing::create($request->validated());

        // Add photos if provided
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                try {
                    $path = $photo->store('listing_photos', 'public');
                    $listing->photos()->create(['photo_path' => $path]);
                } catch (\Exception $e) {
                    Log::error('File upload error: ' . $e->getMessage());
                }
            }
        }

        return new ListingResource($listing->load(['seller', 'subcategory.category', 'photos']));
    }

    /**
     * Display the specified resource.
     */
    public function show(Listing $listing)
    {
        return new ListingResource($listing->load(['seller', 'subcategory.category', 'photos']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListingRequest $request, Listing $listing)
    {
        $listing->update($request->validated());

        // Add photos if provided
        if ($request->hasFile('photos')) {
            // Remove current listing photos
            $listing->photos()->delete();

            foreach ($request->file('photos') as $photo) {
                try {
                    $path = $photo->store('listing_photos', 'public');
                    $listing->photos()->create(['photo_path' => $path]);
                } catch (\Exception $e) {
                    Log::error('File upload error: ' . $e->getMessage());
                }
            }
        }

        return new ListingResource($listing->refresh()->load(['seller', 'subcategory.category', 'photos']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing)
    {
        $listing->delete();

        return response()->noContent();
    }
}
