import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Paginated, ProductSupplier } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ productSuppliers }: PageProps<{ productSuppliers: Paginated<ProductSupplier> }>) {
    const deactivate = (id: number) => {
        if (confirm('Dezaktywować to powiązanie?')) {
            router.delete(route('product-supplier.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Powiązania produkt–dostawca</h2>
                    <Link href={route('product-supplier.create')} className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
                        Dodaj powiązanie
                    </Link>
                </div>
            }
        >
            <Head title="Powiązania" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Produkt</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Dostawca</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Stan magazynowy</th>
                                        <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {productSuppliers.data.map((ps) => (
                                        <tr key={ps.id}>
                                            <td className="px-4 py-2">{ps.product?.name || '—'}</td>
                                            <td className="px-4 py-2">{ps.supplier?.name || '—'}</td>
                                            <td className="px-4 py-2">{ps.stock_quantity}</td>
                                            <td className="space-x-2 px-4 py-2 text-right">
                                                <Link href={route('product-supplier.show', ps.id)} className="text-indigo-600 hover:underline">
                                                    Pokaż
                                                </Link>
                                                <Link href={route('product-supplier.edit', ps.id)} className="text-indigo-600 hover:underline">
                                                    Edytuj
                                                </Link>
                                                <button onClick={() => deactivate(ps.id)} className="text-red-600 hover:underline">
                                                    Dezaktywuj
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={productSuppliers.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
