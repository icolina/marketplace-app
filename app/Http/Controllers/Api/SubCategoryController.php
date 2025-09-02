<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subcategory;
use App\Http\Requests\Api\StoreSubcategoryRequest;
use App\Http\Requests\Api\UpdateSubcategoryRequest;
use App\Http\Resources\SubcategoryResource;

class SubcategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SubcategoryResource::collection(Subcategory::all()->load(['category']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubcategoryRequest $request)
    {
        $subcategory = Subcategory::create($request->validated());

        return new SubcategoryResource($subcategory->load(['category']));
    }

    /**
     * Display the specified resource.
     */
    public function show(Subcategory $subcategory)
    {
        return new SubcategoryResource($subcategory->load(['category']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubcategoryRequest $request, Subcategory $subcategory)
    {
        $subcategory->update($request->validated());

        return new SubcategoryResource($subcategory->refresh()->load(['category']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcategory $subcategory)
    {
        $subcategory->delete();

        return response()->noContent();
    }
}
