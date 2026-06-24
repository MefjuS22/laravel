<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategoryService
{
    public function paginateActive(): LengthAwarePaginator
    {
        return Category::active()->latest()->paginate(10);
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(Category $category, array $data): Category
    {
        $category->update($data);

        return $category;
    }

    public function deactivate(Category $category): void
    {
        $category->deactivate();
    }

    public function loadWithActiveProducts(Category $category): Category
    {
        $category->load(['products' => fn ($q) => $q->active()]);

        return $category;
    }
}
