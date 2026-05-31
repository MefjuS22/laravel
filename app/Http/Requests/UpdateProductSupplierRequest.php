<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productSupplier = $this->route('product_supplier');

        return [
            'product_id' => ['required', 'exists:products,id'],
            'supplier_id' => [
                'required',
                'exists:suppliers,id',
                Rule::unique('product_supplier')
                    ->where(fn ($query) => $query->where('product_id', $this->input('product_id')))
                    ->ignore($productSupplier?->id),
            ],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'stock_quantity.min' => 'Ilość nie może być ujemna.',
        ];
    }
}
