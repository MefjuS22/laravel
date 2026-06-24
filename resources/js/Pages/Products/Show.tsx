import Card from '@/Components/Shop/Card';
import EmptyState from '@/Components/Shop/EmptyState';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function Show({ product }: PageProps<{ product: Product }>) {
    const suppliers = product.product_suppliers || [];

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={product.name}
                    actions={
                        <>
                            <Link href={route('products.edit', product.id)} className="btn-primary">
                                <Pencil className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Edytuj
                            </Link>
                            <Link href={route('products.index')} className="btn-secondary">
                                <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Powrót
                            </Link>
                        </>
                    }
                />
            }
        >
            <Head title={product.name} />
            <PageContainer>
                <Card>
                    <dl className="mb-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-slate-50 p-4">
                            <dt className="shop-detail-label">Kategoria</dt>
                            <dd className="shop-detail-value">
                                {product.category ? (
                                    <Link
                                        href={route('categories.show', product.category.id)}
                                        className="btn-ghost"
                                    >
                                        {product.category.name}
                                    </Link>
                                ) : (
                                    '—'
                                )}
                            </dd>
                        </div>
                        <div className="rounded-lg bg-indigo-50 p-4">
                            <dt className="shop-detail-label">Cena</dt>
                            <dd className="text-2xl font-semibold tabular-nums text-indigo-900">
                                {Number(product.price).toFixed(2)} zł
                            </dd>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
                            <dt className="shop-detail-label">Opis</dt>
                            <dd className="shop-detail-value">
                                {product.description || '—'}
                            </dd>
                        </div>
                    </dl>

                    <h3 className="mb-4 text-lg font-semibold text-slate-900">
                        Dostawcy
                    </h3>
                    {suppliers.length > 0 ? (
                        <div className="shop-table-wrap">
                            <table className="shop-table">
                                <thead>
                                    <tr>
                                        <th>Dostawca</th>
                                        <th>E-mail</th>
                                        <th>Stan magazynowy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.map((ps) => (
                                        <tr key={ps.id}>
                                            <td className="font-medium text-slate-900">
                                                {ps.supplier ? (
                                                    <Link
                                                        href={route('suppliers.show', ps.supplier.id)}
                                                        className="btn-ghost"
                                                    >
                                                        {ps.supplier.name}
                                                    </Link>
                                                ) : (
                                                    '—'
                                                )}
                                            </td>
                                            <td>{ps.supplier?.email || '—'}</td>
                                            <td>
                                                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-sm font-medium tabular-nums text-emerald-800">
                                                    {ps.stock_quantity} szt.
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState message="Brak powiązanych dostawców." />
                    )}
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
