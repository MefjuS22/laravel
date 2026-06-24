import Pagination from '@/Components/Pagination';
import Card from '@/Components/Shop/Card';
import EmptyState from '@/Components/Shop/EmptyState';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import PrimaryLink from '@/Components/Shop/PrimaryLink';
import TableActions from '@/Components/Shop/TableActions';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Paginated, ProductSupplier } from '@/types';
import { Head, router } from '@inertiajs/react';

export default function Index({ productSuppliers }: PageProps<{ productSuppliers: Paginated<ProductSupplier> }>) {
    const deactivate = (id: number) => {
        if (confirm('Dezaktywować to powiązanie?')) {
            router.delete(route('product-supplier.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title="Powiązania"
                    actions={
                        <PrimaryLink href={route('product-supplier.create')}>
                            Dodaj powiązanie
                        </PrimaryLink>
                    }
                />
            }
        >
            <Head title="Powiązania" />
            <PageContainer>
                <Card>
                    {productSuppliers.data.length === 0 ? (
                        <EmptyState message="Brak powiązań produkt–dostawca." />
                    ) : (
                        <div className="shop-table-wrap">
                            <table className="shop-table">
                                <thead>
                                    <tr>
                                        <th>Produkt</th>
                                        <th>Dostawca</th>
                                        <th>Stan magazynowy</th>
                                        <th className="shop-table-actions">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productSuppliers.data.map((ps) => (
                                        <tr key={ps.id}>
                                            <td className="font-medium text-slate-900">
                                                {ps.product?.name || '—'}
                                            </td>
                                            <td>{ps.supplier?.name || '—'}</td>
                                            <td>
                                                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-sm font-medium tabular-nums text-emerald-800">
                                                    {ps.stock_quantity} szt.
                                                </span>
                                            </td>
                                            <td className="shop-table-actions">
                                                <TableActions
                                                    showHref={route('product-supplier.show', ps.id)}
                                                    editHref={route('product-supplier.edit', ps.id)}
                                                    onDeactivate={() => deactivate(ps.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Pagination links={productSuppliers.links} />
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
