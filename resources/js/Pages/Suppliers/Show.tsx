import Card from '@/Components/Shop/Card';
import EmptyState from '@/Components/Shop/EmptyState';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Supplier } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function Show({ supplier }: PageProps<{ supplier: Supplier }>) {
    const productLinks = supplier.product_suppliers || [];

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={supplier.name}
                    actions={
                        <>
                            <Link href={route('suppliers.edit', supplier.id)} className="btn-primary">
                                <Pencil className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Edytuj
                            </Link>
                            <Link href={route('suppliers.index')} className="btn-secondary">
                                <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Powrót
                            </Link>
                        </>
                    }
                />
            }
        >
            <Head title={supplier.name} />
            <PageContainer>
                <Card>
                    <dl className="mb-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-slate-50 p-4">
                            <dt className="shop-detail-label">E-mail</dt>
                            <dd className="shop-detail-value">{supplier.email}</dd>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-4">
                            <dt className="shop-detail-label">Telefon</dt>
                            <dd className="shop-detail-value">{supplier.phone || '—'}</dd>
                        </div>
                    </dl>

                    <h3 className="mb-4 text-lg font-semibold text-slate-900">
                        Produkty u dostawcy
                    </h3>
                    {productLinks.length > 0 ? (
                        <div className="shop-table-wrap">
                            <table className="shop-table">
                                <thead>
                                    <tr>
                                        <th>Produkt</th>
                                        <th>Stan magazynowy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productLinks.map((ps) => (
                                        <tr key={ps.id}>
                                            <td className="font-medium text-slate-900">
                                                {ps.product ? (
                                                    <Link
                                                        href={route('products.show', ps.product.id)}
                                                        className="btn-ghost"
                                                    >
                                                        {ps.product.name}
                                                    </Link>
                                                ) : (
                                                    '—'
                                                )}
                                            </td>
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
                        <EmptyState message="Brak powiązanych produktów." />
                    )}
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
