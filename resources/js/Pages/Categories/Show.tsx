import FlashMessage from '@/Components/FlashMessage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Show({ category }: PageProps<{ category: Category }>) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                    <div className="space-x-2">
                        <Link href={route('categories.edit', category.id)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
                            Edytuj
                        </Link>
                        <Link href={route('categories.index')} className="rounded-md border px-4 py-2 text-sm text-gray-700">
                            Powrót
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={category.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <FlashMessage />
                            <dl className="mb-6 space-y-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Opis</dt>
                                    <dd className="mt-1 text-gray-900">{category.description || '—'}</dd>
                                </div>
                            </dl>
                            <h3 className="mb-3 text-lg font-medium text-gray-800">Produkty</h3>
                            {(category.products?.length ?? 0) > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Nazwa</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Cena</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">Akcje</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {(category.products ?? []).map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-4 py-2">{product.name}</td>
                                                <td className="px-4 py-2">{Number(product.price).toFixed(2)} zł</td>
                                                <td className="px-4 py-2 text-right">
                                                    <Link href={route('products.show', product.id)} className="text-indigo-600 hover:underline">
                                                        Pokaż
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500">Brak produktów w tej kategorii.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
