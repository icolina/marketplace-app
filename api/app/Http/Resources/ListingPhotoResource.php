<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ListingPhotoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $url = Str::isUrl($this->photo_path) ? $this->photo_path : Storage::url($this->photo_path);

        return [
            'id' => $this->id,
            'url' => $url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
