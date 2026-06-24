<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Categories/Index', [
            'categories' => $this->categoryService->paginateActive(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Create');
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $this->categoryService->create($request->validated());

        return redirect()->route('categories.index')
            ->with('success', 'Kategoria została dodana.');
    }

    public function show(Category $category): Response
    {
        return Inertia::render('Categories/Show', [
            'category' => $this->categoryService->loadWithActiveProducts($category),
        ]);
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $this->categoryService->update($category, $request->validated());

        return redirect()->route('categories.index')
            ->with('success', 'Kategoria została zaktualizowana.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->categoryService->deactivate($category);

        return redirect()->route('categories.index')
            ->with('success', 'Kategoria została dezaktywowana.');
    }
}
