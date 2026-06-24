import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps, Paginated, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

export default function Index({
    products,
    categories,
    filters,
}: PageProps<{
    products: Paginated<Product>;
    categories: Category[];
    filters: { search?: string; category_id?: string };
}>) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');

    const submitSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            route('products.index'),
            { search, category_id: categoryId || undefined },
            { preserveState: true },
        );
    };

    const deactivate = (id: number) => {
        if (confirm('Dezaktywować ten produkt?')) {
            router.delete(route('products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Produkty</h2>
                    <Link href={route('products.create')} className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
                        Dodaj produkt
                    </Link>
                </div>
            }
        >
            <Head title="Produkty" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submitSearch} className="mb-6 flex flex-wrap items-end gap-4">
                                <div>
                                    <InputLabel htmlFor="search" value="Szukaj" />
                                    <TextInput id="search" className="mt-1" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nazwa lub opis..." />
                                </div>
                                <div>
                                    <InputLabel htmlFor="category_id" value="Kategoria" />
                                    <select
                                        id="category_id"
                                        className="mt-1 block rounded-md border-gray-300 shadow-sm"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        <option value="">Wszystkie</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700">
                                    Filtruj
                                </button>
                            </form>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Nazwa</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Kategoria</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Cena</th>
                                        <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-4 py-2">{product.name}</td>
                                            <td className="px-4 py-2">{product.category?.name || '—'}</td>
                                            <td className="px-4 py-2">{Number(product.price).toFixed(2)} zł</td>
                                            <td className="space-x-2 px-4 py-2 text-right">
                                                <Link href={route('products.show', product.id)} className="text-indigo-600 hover:underline">
                                                    Pokaż
                                                </Link>
                                                <Link href={route('products.edit', product.id)} className="text-indigo-600 hover:underline">
                                                    Edytuj
                                                </Link>
                                                <button onClick={() => deactivate(product.id)} className="text-red-600 hover:underline">
                                                    Dezaktywuj
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={products.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
