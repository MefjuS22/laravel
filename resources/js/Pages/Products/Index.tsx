import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import Card from '@/Components/Shop/Card';
import EmptyState from '@/Components/Shop/EmptyState';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import PrimaryLink from '@/Components/Shop/PrimaryLink';
import TableActions from '@/Components/Shop/TableActions';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps, Paginated, Product } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
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
                <PageHeader
                    title="Produkty"
                    actions={
                        <PrimaryLink href={route('products.create')}>
                            Dodaj produkt
                        </PrimaryLink>
                    }
                />
            }
        >
            <Head title="Produkty" />
            <PageContainer>
                <Card>
                    <form onSubmit={submitSearch} className="shop-filter-bar">
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="min-w-[12rem] flex-1">
                                <InputLabel htmlFor="search" value="Szukaj" />
                                <TextInput
                                    id="search"
                                    className="mt-1 block w-full"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Nazwa lub opis..."
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="category_id" value="Kategoria" />
                                <select
                                    id="category_id"
                                    className="shop-select"
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
                            <button type="submit" className="btn-primary">
                                <Search className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Filtruj
                            </button>
                        </div>
                    </form>

                    {products.data.length === 0 ? (
                        <EmptyState message="Brak produktów spełniających kryteria." />
                    ) : (
                        <div className="shop-table-wrap">
                            <table className="shop-table">
                                <thead>
                                    <tr>
                                        <th>Nazwa</th>
                                        <th>Kategoria</th>
                                        <th>Cena</th>
                                        <th className="shop-table-actions">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="font-medium text-slate-900">
                                                {product.name}
                                            </td>
                                            <td>
                                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                                    {product.category?.name || '—'}
                                                </span>
                                            </td>
                                            <td className="font-medium tabular-nums text-slate-900">
                                                {Number(product.price).toFixed(2)} zł
                                            </td>
                                            <td className="shop-table-actions">
                                                <TableActions
                                                    showHref={route('products.show', product.id)}
                                                    editHref={route('products.edit', product.id)}
                                                    onDeactivate={() => deactivate(product.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Pagination links={products.links} />
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
