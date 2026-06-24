import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product, Supplier } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Create({ products, suppliers }: PageProps<{ products: Product[]; suppliers: Supplier[] }>) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        supplier_id: '',
        stock_quantity: 0,
        is_active: true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('product-supplier.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Nowe powiązanie</h2>}>
            <Head title="Nowe powiązanie" />
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="product_id" value="Produkt *" />
                                <select
                                    id="product_id"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={data.product_id}
                                    onChange={(e) => setData('product_id', e.target.value)}
                                    required
                                >
                                    <option value="">Wybierz produkt</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.product_id} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="supplier_id" value="Dostawca *" />
                                <select
                                    id="supplier_id"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={data.supplier_id}
                                    onChange={(e) => setData('supplier_id', e.target.value)}
                                    required
                                >
                                    <option value="">Wybierz dostawcę</option>
                                    {suppliers.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.supplier_id} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="stock_quantity" value="Stan magazynowy *" />
                                <TextInput
                                    id="stock_quantity"
                                    type="number"
                                    min="0"
                                    className="mt-1 block w-full"
                                    value={data.stock_quantity}
                                    onChange={(e) => setData('stock_quantity', Number(e.target.value))}
                                    required
                                />
                                <InputError message={errors.stock_quantity} className="mt-2" />
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" disabled={processing} className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                                    Zapisz
                                </button>
                                <Link href={route('product-supplier.index')} className="rounded-md border px-4 py-2 text-gray-700">
                                    Anuluj
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
