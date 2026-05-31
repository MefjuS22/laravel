import FlashMessage from '@/Components/FlashMessage';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps, Paginated } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ categories }: PageProps<{ categories: Paginated<Category> }>) {
    const deactivate = (id: number) => {
        if (confirm('Dezaktywować tę kategorię?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Kategorie</h2>
                    <Link
                        href={route('categories.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                        Dodaj kategorię
                    </Link>
                </div>
            }
        >
            <Head title="Kategorie" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <FlashMessage />
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Nazwa</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Opis</th>
                                        <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {categories.data.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-4 py-2">{category.name}</td>
                                            <td className="px-4 py-2">{category.description || '—'}</td>
                                            <td className="space-x-2 px-4 py-2 text-right">
                                                <Link href={route('categories.show', category.id)} className="text-indigo-600 hover:underline">Pokaż</Link>
                                                <Link href={route('categories.edit', category.id)} className="text-indigo-600 hover:underline">Edytuj</Link>
                                                <button onClick={() => deactivate(category.id)} className="text-red-600 hover:underline">Dezaktywuj</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={categories.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
