<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'category' => $this->whenLoaded('category', function() {
                return new CategoryResource($this->category);
            }),
            'subcategory' => $this->whenLoaded('subcategory'),
            'photos' => $this->whenLoaded('photos', function() {
                return ListingPhotoResource::collection($this->photos);
            }),
            'seller' => $this->whenLoaded('seller'),
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
