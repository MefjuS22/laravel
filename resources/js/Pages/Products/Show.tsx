import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Show({ product }: PageProps<{ product: Product }>) {
    const suppliers = product.product_suppliers || [];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                    <div className="space-x-2">
                        <Link href={route('products.edit', product.id)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
                            Edytuj
                        </Link>
                        <Link href={route('products.index')} className="rounded-md border px-4 py-2 text-sm text-gray-700">
                            Powrót
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={product.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <dl className="mb-6 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Kategoria</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {product.category ? (
                                            <Link href={route('categories.show', product.category.id)} className="text-indigo-600 hover:underline">
                                                {product.category.name}
                                            </Link>
                                        ) : (
                                            '—'
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Cena</dt>
                                    <dd className="mt-1 text-gray-900">{Number(product.price).toFixed(2)} zł</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Opis</dt>
                                    <dd className="mt-1 text-gray-900">{product.description || '—'}</dd>
                                </div>
                            </dl>
                            <h3 className="mb-3 text-lg font-medium text-gray-800">Dostawcy</h3>
                            {suppliers.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Dostawca</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">E-mail</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Stan magazynowy</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {suppliers.map((ps) => (
                                            <tr key={ps.id}>
                                                <td className="px-4 py-2">
                                                    {ps.supplier ? (
                                                        <Link href={route('suppliers.show', ps.supplier.id)} className="text-indigo-600 hover:underline">
                                                            {ps.supplier.name}
                                                        </Link>
                                                    ) : (
                                                        '—'
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">{ps.supplier?.email || '—'}</td>
                                                <td className="px-4 py-2">{ps.stock_quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500">Brak powiązanych dostawców.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
