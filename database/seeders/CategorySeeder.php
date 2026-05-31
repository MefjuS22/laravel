<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Elektronika', 'description' => 'Urządzenia elektroniczne'],
            ['name' => 'Odzież', 'description' => 'Ubrania i akcesoria'],
            ['name' => 'Dom i ogród', 'description' => 'Wyposażenie domu'],
            ['name' => 'Sport', 'description' => 'Sprzęt sportowy'],
            ['name' => 'Książki', 'description' => 'Literatura i podręczniki'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
