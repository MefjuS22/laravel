import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, ProductSupplier } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Show({ productSupplier }: PageProps<{ productSupplier: ProductSupplier }>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Powiązanie produkt–dostawca</h2>
                    <div className="space-x-2">
                        <Link href={route('product-supplier.edit', productSupplier.id)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
                            Edytuj
                        </Link>
                        <Link href={route('product-supplier.index')} className="rounded-md border px-4 py-2 text-sm text-gray-700">
                            Powrót
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Powiązanie" />
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Produkt</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {productSupplier.product ? (
                                            <Link href={route('products.show', productSupplier.product.id)} className="text-indigo-600 hover:underline">
                                                {productSupplier.product.name}
                                            </Link>
                                        ) : (
                                            '—'
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Dostawca</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {productSupplier.supplier ? (
                                            <Link href={route('suppliers.show', productSupplier.supplier.id)} className="text-indigo-600 hover:underline">
                                                {productSupplier.supplier.name}
                                            </Link>
                                        ) : (
                                            '—'
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Stan magazynowy</dt>
                                    <dd className="mt-1 text-gray-900">{productSupplier.stock_quantity}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
