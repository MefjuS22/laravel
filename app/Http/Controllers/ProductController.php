<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService,
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Products/Index', [
            'products' => $this->productService->searchAndPaginate($request->only(['search', 'category_id'])),
            'categories' => $this->productService->listCategoriesForForm(),
            'filters' => $request->only(['search', 'category_id']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Products/Create', [
            'categories' => $this->productService->listCategoriesForForm(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $this->productService->create($request->validated());

        return redirect()->route('products.index')
            ->with('success', 'Produkt został dodany.');
    }

    public function show(Product $product): Response
    {
        return Inertia::render('Products/Show', [
            'product' => $this->productService->loadForShow($product),
        ]);
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $this->productService->listCategoriesForForm(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $this->productService->update($product, $request->validated());

        return redirect()->route('products.index')
            ->with('success', 'Produkt został zaktualizowany.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->productService->deactivate($product);

        return redirect()->route('products.index')
            ->with('success', 'Produkt został dezaktywowany.');
    }
}
