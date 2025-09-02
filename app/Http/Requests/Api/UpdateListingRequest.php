<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateListingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|sometimes|max:255',
            'description' => 'string|sometimes',
            'price' => 'numeric|sometimes|min:1',
            'status' => 'sometimes|in:active,pending,sold,inactive',
            'subcategory_id' => 'integer|sometimes|exists:subcategories,id',
            'photos' => 'array|sometimes|min:1',
            'photos.*' => 'image|sometimes|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
