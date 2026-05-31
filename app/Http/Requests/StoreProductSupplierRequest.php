<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => ['required', 'exists:products,id'],
            'supplier_id' => [
                'required',
                'exists:suppliers,id',
                Rule::unique('product_supplier')->where(function ($query) {
                    return $query->where('product_id', $this->input('product_id'));
                }),
            ],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'Produkt jest wymagany.',
            'supplier_id.required' => 'Dostawca jest wymagany.',
            'supplier_id.unique' => 'To powiązanie już istnieje.',
            'stock_quantity.min' => 'Ilość nie może być ujemna.',
        ];
    }
}
