import Pagination from '@/Components/Pagination';
import Card from '@/Components/Shop/Card';
import EmptyState from '@/Components/Shop/EmptyState';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import PrimaryLink from '@/Components/Shop/PrimaryLink';
import TableActions from '@/Components/Shop/TableActions';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps, Paginated } from '@/types';
import { Head, router } from '@inertiajs/react';

export default function Index({ categories }: PageProps<{ categories: Paginated<Category> }>) {
    const deactivate = (id: number) => {
        if (confirm('Dezaktywować tę kategorię?')) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title="Kategorie"
                    actions={
                        <PrimaryLink href={route('categories.create')}>
                            Dodaj kategorię
                        </PrimaryLink>
                    }
                />
            }
        >
            <Head title="Kategorie" />
            <PageContainer>
                <Card>
                    {categories.data.length === 0 ? (
                        <EmptyState message="Brak kategorii. Dodaj pierwszą kategorię." />
                    ) : (
                        <div className="shop-table-wrap">
                            <table className="shop-table">
                                <thead>
                                    <tr>
                                        <th>Nazwa</th>
                                        <th>Opis</th>
                                        <th className="shop-table-actions">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.data.map((category) => (
                                        <tr key={category.id}>
                                            <td className="font-medium text-slate-900">
                                                {category.name}
                                            </td>
                                            <td className="max-w-md truncate text-slate-500">
                                                {category.description || '—'}
                                            </td>
                                            <td className="shop-table-actions">
                                                <TableActions
                                                    showHref={route('categories.show', category.id)}
                                                    editHref={route('categories.edit', category.id)}
                                                    onDeactivate={() => deactivate(category.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <Pagination links={categories.links} />
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
