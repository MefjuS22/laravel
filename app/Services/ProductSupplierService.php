<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductSupplier;
use App\Models\Supplier;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductSupplierService
{
    public function paginateActiveWithRelations(): LengthAwarePaginator
    {
        return ProductSupplier::active()
            ->with(['product', 'supplier'])
            ->latest()
            ->paginate(10);
    }

    public function formOptions(): array
    {
        return [
            'products' => Product::active()->orderBy('name')->get(['id', 'name']),
            'suppliers' => Supplier::active()->orderBy('name')->get(['id', 'name']),
        ];
    }

    public function create(array $data): ProductSupplier
    {
        return ProductSupplier::create($data);
    }

    public function update(ProductSupplier $productSupplier, array $data): ProductSupplier
    {
        $productSupplier->update($data);

        return $productSupplier;
    }

    public function deactivate(ProductSupplier $productSupplier): void
    {
        $productSupplier->deactivate();
    }

    public function loadForShow(ProductSupplier $productSupplier): ProductSupplier
    {
        $productSupplier->load(['product', 'supplier']);

        return $productSupplier;
    }
}
