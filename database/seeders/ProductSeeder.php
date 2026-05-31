<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['category' => 'Elektronika', 'name' => 'Laptop Pro 15', 'description' => 'Laptop do pracy i nauki', 'price' => 4299.99],
            ['category' => 'Elektronika', 'name' => 'Słuchawki bezprzewodowe', 'description' => 'ANC, bluetooth 5.3', 'price' => 349.00],
            ['category' => 'Odzież', 'name' => 'Kurtka zimowa', 'description' => 'Ciepła kurtka męska', 'price' => 499.00],
            ['category' => 'Odzież', 'name' => 'Bluza bawełniana', 'description' => 'Bluza unisex', 'price' => 89.99],
            ['category' => 'Dom i ogród', 'name' => 'Ekspres do kawy', 'description' => 'Ciśnieniowy ekspres', 'price' => 799.00],
            ['category' => 'Sport', 'name' => 'Hantle 2x5kg', 'description' => 'Zestaw hantli', 'price' => 129.00],
            ['category' => 'Książki', 'name' => 'PHP dla początkujących', 'description' => 'Podręcznik programowania', 'price' => 59.99],
        ];

        foreach ($products as $item) {
            $category = Category::where('name', $item['category'])->first();
            if ($category) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => $item['name'],
                    'description' => $item['description'],
                    'price' => $item['price'],
                ]);
            }
        }
    }
}
