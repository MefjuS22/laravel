<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductSupplierRequest;
use App\Http\Requests\UpdateProductSupplierRequest;
use App\Models\ProductSupplier;
use App\Services\ProductSupplierService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductSupplierController extends Controller
{
    public function __construct(
        private readonly ProductSupplierService $productSupplierService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('ProductSuppliers/Index', [
            'productSuppliers' => $this->productSupplierService->paginateActiveWithRelations(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ProductSuppliers/Create', $this->productSupplierService->formOptions());
    }

    public function store(StoreProductSupplierRequest $request): RedirectResponse
    {
        $this->productSupplierService->create($request->validated());

        return redirect()->route('product-supplier.index')
            ->with('success', 'Powiązanie zostało dodane.');
    }

    public function show(ProductSupplier $product_supplier): Response
    {
        return Inertia::render('ProductSuppliers/Show', [
            'productSupplier' => $this->productSupplierService->loadForShow($product_supplier),
        ]);
    }

    public function edit(ProductSupplier $product_supplier): Response
    {
        return Inertia::render('ProductSuppliers/Edit', [
            'productSupplier' => $product_supplier,
            ...$this->productSupplierService->formOptions(),
        ]);
    }

    public function update(UpdateProductSupplierRequest $request, ProductSupplier $product_supplier): RedirectResponse
    {
        $this->productSupplierService->update($product_supplier, $request->validated());

        return redirect()->route('product-supplier.index')
            ->with('success', 'Powiązanie zostało zaktualizowane.');
    }

    public function destroy(ProductSupplier $product_supplier): RedirectResponse
    {
        $this->productSupplierService->deactivate($product_supplier);

        return redirect()->route('product-supplier.index')
            ->with('success', 'Powiązanie zostało dezaktywowane.');
    }
}
