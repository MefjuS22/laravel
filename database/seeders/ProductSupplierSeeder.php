<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductSupplier;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class ProductSupplierSeeder extends Seeder
{
    public function run(): void
    {
        $links = [
            ['product' => 'Laptop Pro 15', 'supplier' => 'TechSupply Sp. z o.o.', 'stock_quantity' => 15],
            ['product' => 'Słuchawki bezprzewodowe', 'supplier' => 'TechSupply Sp. z o.o.', 'stock_quantity' => 40],
            ['product' => 'Kurtka zimowa', 'supplier' => 'ModaPlus', 'stock_quantity' => 25],
            ['product' => 'Bluza bawełniana', 'supplier' => 'ModaPlus', 'stock_quantity' => 60],
            ['product' => 'Ekspres do kawy', 'supplier' => 'Domex', 'stock_quantity' => 10],
        ];

        foreach ($links as $link) {
            $product = Product::where('name', $link['product'])->first();
            $supplier = Supplier::where('name', $link['supplier'])->first();

            if ($product && $supplier) {
                ProductSupplier::create([
                    'product_id' => $product->id,
                    'supplier_id' => $supplier->id,
                    'stock_quantity' => $link['stock_quantity'],
                ]);
            }
        }
    }
}
