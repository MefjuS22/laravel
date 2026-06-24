<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function searchAndPaginate(array $filters): LengthAwarePaginator
    {
        $query = Product::active()->with('category');

        if ($search = $filters['search'] ?? null) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($categoryId = $filters['category_id'] ?? null) {
            $query->where('category_id', $categoryId);
        }

        return $query->latest()->paginate(10)->withQueryString();
    }

    public function listCategoriesForForm(): Collection
    {
        return Category::active()->orderBy('name')->get(['id', 'name']);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(Product $product, array $data): Product
    {
        $product->update($data);

        return $product;
    }

    public function deactivate(Product $product): void
    {
        $product->deactivate();
    }

    public function loadForShow(Product $product): Product
    {
        $product->load(['category', 'productSuppliers' => fn ($q) => $q->active()->with('supplier')]);

        return $product;
    }
}
