<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            ['name' => 'TechSupply Sp. z o.o.', 'email' => 'kontakt@techsupply.pl', 'phone' => '123456789'],
            ['name' => 'ModaPlus', 'email' => 'biuro@modaplus.pl', 'phone' => '987654321'],
            ['name' => 'Domex', 'email' => 'info@domex.pl', 'phone' => '555666777'],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
