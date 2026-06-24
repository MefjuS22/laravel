import Card from '@/Components/Shop/Card';
import EmptyState from '@/Components/Shop/EmptyState';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function Show({ category }: PageProps<{ category: Category }>) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={category.name}
                    actions={
                        <>
                            <Link
                                href={route('categories.edit', category.id)}
                                className="btn-primary"
                            >
                                <Pencil className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Edytuj
                            </Link>
                            <Link href={route('categories.index')} className="btn-secondary">
                                <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Powrót
                            </Link>
                        </>
                    }
                />
            }
        >
            <Head title={category.name} />
            <PageContainer>
                <Card>
                    <dl className="mb-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-slate-50 p-4">
                            <dt className="shop-detail-label">Opis</dt>
                            <dd className="shop-detail-value">
                                {category.description || '—'}
                            </dd>
                        </div>
                    </dl>

                    <h3 className="mb-4 text-lg font-semibold text-slate-900">
                        Produkty w kategorii
                    </h3>
                    {(category.products?.length ?? 0) > 0 ? (
                        <div className="shop-table-wrap">
                            <table className="shop-table">
                                <thead>
                                    <tr>
                                        <th>Nazwa</th>
                                        <th>Cena</th>
                                        <th className="shop-table-actions">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(category.products ?? []).map((product) => (
                                        <tr key={product.id}>
                                            <td className="font-medium text-slate-900">
                                                {product.name}
                                            </td>
                                            <td className="tabular-nums">
                                                {Number(product.price).toFixed(2)} zł
                                            </td>
                                            <td className="shop-table-actions">
                                                <Link
                                                    href={route('products.show', product.id)}
                                                    className="btn-ghost"
                                                >
                                                    Pokaż
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState message="Brak produktów w tej kategorii." />
                    )}
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
