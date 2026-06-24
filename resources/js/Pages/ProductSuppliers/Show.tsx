import Card from '@/Components/Shop/Card';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, ProductSupplier } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function Show({ productSupplier }: PageProps<{ productSupplier: ProductSupplier }>) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title="Powiązanie produkt–dostawca"
                    actions={
                        <>
                            <Link
                                href={route('product-supplier.edit', productSupplier.id)}
                                className="btn-primary"
                            >
                                <Pencil className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Edytuj
                            </Link>
                            <Link href={route('product-supplier.index')} className="btn-secondary">
                                <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                Powrót
                            </Link>
                        </>
                    }
                />
            }
        >
            <Head title="Powiązanie" />
            <PageContainer narrow>
                <Card>
                    <dl className="grid gap-4">
                        <div className="rounded-lg bg-slate-50 p-4">
                            <dt className="shop-detail-label">Produkt</dt>
                            <dd className="shop-detail-value">
                                {productSupplier.product ? (
                                    <Link
                                        href={route('products.show', productSupplier.product.id)}
                                        className="btn-ghost text-base"
                                    >
                                        {productSupplier.product.name}
                                    </Link>
                                ) : (
                                    '—'
                                )}
                            </dd>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-4">
                            <dt className="shop-detail-label">Dostawca</dt>
                            <dd className="shop-detail-value">
                                {productSupplier.supplier ? (
                                    <Link
                                        href={route('suppliers.show', productSupplier.supplier.id)}
                                        className="btn-ghost text-base"
                                    >
                                        {productSupplier.supplier.name}
                                    </Link>
                                ) : (
                                    '—'
                                )}
                            </dd>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-4">
                            <dt className="shop-detail-label">Stan magazynowy</dt>
                            <dd className="text-2xl font-semibold tabular-nums text-emerald-900">
                                {productSupplier.stock_quantity} szt.
                            </dd>
                        </div>
                    </dl>
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
