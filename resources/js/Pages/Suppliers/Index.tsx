import Pagination from '@/Components/Pagination';
import Card from '@/Components/Shop/Card';
import EmptyState from '@/Components/Shop/EmptyState';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import PrimaryLink from '@/Components/Shop/PrimaryLink';
import TableActions from '@/Components/Shop/TableActions';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Paginated, Supplier } from '@/types';
import { Head, router } from '@inertiajs/react';

export default function Index({ suppliers }: PageProps<{ suppliers: Paginated<Supplier> }>) {
    const deactivate = (id: number) => {
        if (confirm('Dezaktywować tego dostawcę?')) {
            router.delete(route('suppliers.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title="Dostawcy"
                    actions={
                        <PrimaryLink href={route('suppliers.create')}>
                            Dodaj dostawcę
                        </PrimaryLink>
                    }
                />
            }
        >
            <Head title="Dostawcy" />
            <PageContainer>
                <Card>
                    {suppliers.data.length === 0 ? (
                        <EmptyState message="Brak dostawców. Dodaj pierwszego dostawcę." />
                    ) : (
                        <div className="shop-table-wrap">
                            <table className="shop-table">
                                <thead>
                                    <tr>
                                        <th>Nazwa</th>
                                        <th>E-mail</th>
                                        <th>Telefon</th>
                                        <th className="shop-table-actions">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.data.map((supplier) => (
                                        <tr key={supplier.id}>
                                            <td className="font-medium text-slate-900">
                                                {supplier.name}
                                            </td>
                                            <td>{supplier.email}</td>
                                            <td>{supplier.phone || '—'}</td>
                                            <td className="shop-table-actions">
                                                <TableActions
                                                    showHref={route('suppliers.show', supplier.id)}
                                                    editHref={route('suppliers.edit', supplier.id)}
                                                    onDeactivate={() => deactivate(supplier.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Pagination links={suppliers.links} />
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
