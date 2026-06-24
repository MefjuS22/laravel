<?php

namespace App\Services;

use App\Models\Supplier;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SupplierService
{
    public function paginateActive(): LengthAwarePaginator
    {
        return Supplier::active()->latest()->paginate(10);
    }

    public function create(array $data): Supplier
    {
        return Supplier::create($data);
    }

    public function update(Supplier $supplier, array $data): Supplier
    {
        $supplier->update($data);

        return $supplier;
    }

    public function deactivate(Supplier $supplier): void
    {
        $supplier->deactivate();
    }

    public function loadWithActiveProductSuppliers(Supplier $supplier): Supplier
    {
        $supplier->load(['productSuppliers' => fn ($q) => $q->active()->with('product')]);

        return $supplier;
    }
}
