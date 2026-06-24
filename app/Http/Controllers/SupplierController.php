<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Supplier;
use App\Services\SupplierService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function __construct(
        private readonly SupplierService $supplierService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Suppliers/Index', [
            'suppliers' => $this->supplierService->paginateActive(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Suppliers/Create');
    }

    public function store(StoreSupplierRequest $request): RedirectResponse
    {
        $this->supplierService->create($request->validated());

        return redirect()->route('suppliers.index')
            ->with('success', 'Dostawca został dodany.');
    }

    public function show(Supplier $supplier): Response
    {
        return Inertia::render('Suppliers/Show', [
            'supplier' => $this->supplierService->loadWithActiveProductSuppliers($supplier),
        ]);
    }

    public function edit(Supplier $supplier): Response
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier): RedirectResponse
    {
        $this->supplierService->update($supplier, $request->validated());

        return redirect()->route('suppliers.index')
            ->with('success', 'Dostawca został zaktualizowany.');
    }

    public function destroy(Supplier $supplier): RedirectResponse
    {
        $this->supplierService->deactivate($supplier);

        return redirect()->route('suppliers.index')
            ->with('success', 'Dostawca został dezaktywowany.');
    }
}
