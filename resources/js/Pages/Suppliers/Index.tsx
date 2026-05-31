import FlashMessage from '@/Components/FlashMessage';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Paginated, Supplier } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ suppliers }: PageProps<{ suppliers: Paginated<Supplier> }>) {
    const deactivate = (id: number) => {
        if (confirm('Dezaktywować tego dostawcę?')) {
            router.delete(route('suppliers.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Dostawcy</h2>
                    <Link href={route('suppliers.create')} className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
                        Dodaj dostawcę
                    </Link>
                </div>
            }
        >
            <Head title="Dostawcy" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <FlashMessage />
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Nazwa</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">E-mail</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Telefon</th>
                                        <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {suppliers.data.map((supplier) => (
                                        <tr key={supplier.id}>
                                            <td className="px-4 py-2">{supplier.name}</td>
                                            <td className="px-4 py-2">{supplier.email}</td>
                                            <td className="px-4 py-2">{supplier.phone || '—'}</td>
                                            <td className="space-x-2 px-4 py-2 text-right">
                                                <Link href={route('suppliers.show', supplier.id)} className="text-indigo-600 hover:underline">
                                                    Pokaż
                                                </Link>
                                                <Link href={route('suppliers.edit', supplier.id)} className="text-indigo-600 hover:underline">
                                                    Edytuj
                                                </Link>
                                                <button onClick={() => deactivate(supplier.id)} className="text-red-600 hover:underline">
                                                    Dezaktywuj
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={suppliers.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
