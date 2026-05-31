<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductSupplierRequest;
use App\Http\Requests\UpdateProductSupplierRequest;
use App\Models\Product;
use App\Models\ProductSupplier;
use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductSupplierController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('ProductSuppliers/Index', [
            'productSuppliers' => ProductSupplier::active()
                ->with(['product', 'supplier'])
                ->latest()
                ->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ProductSuppliers/Create', [
            'products' => Product::active()->orderBy('name')->get(['id', 'name']),
            'suppliers' => Supplier::active()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreProductSupplierRequest $request): RedirectResponse
    {
        ProductSupplier::create($request->validated());

        return redirect()->route('product-supplier.index')
            ->with('success', 'Powiązanie zostało dodane.');
    }

    public function show(ProductSupplier $product_supplier): Response
    {
        $product_supplier->load(['product', 'supplier']);

        return Inertia::render('ProductSuppliers/Show', [
            'productSupplier' => $product_supplier,
        ]);
    }

    public function edit(ProductSupplier $product_supplier): Response
    {
        return Inertia::render('ProductSuppliers/Edit', [
            'productSupplier' => $product_supplier,
            'products' => Product::active()->orderBy('name')->get(['id', 'name']),
            'suppliers' => Supplier::active()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateProductSupplierRequest $request, ProductSupplier $product_supplier): RedirectResponse
    {
        $product_supplier->update($request->validated());

        return redirect()->route('product-supplier.index')
            ->with('success', 'Powiązanie zostało zaktualizowane.');
    }

    public function destroy(ProductSupplier $product_supplier): RedirectResponse
    {
        $product_supplier->deactivate();

        return redirect()->route('product-supplier.index')
            ->with('success', 'Powiązanie zostało dezaktywowane.');
    }
}
