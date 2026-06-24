import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FolderTree, Link2, Package, Truck } from 'lucide-react';

const modules = [
    {
        name: 'Kategorie',
        route: 'categories.index',
        accent: 'bg-violet-500',
        icon: FolderTree,
    },
    {
        name: 'Produkty',
        route: 'products.index',
        accent: 'bg-indigo-500',
        icon: Package,
    },
    {
        name: 'Dostawcy',
        route: 'suppliers.index',
        accent: 'bg-sky-500',
        icon: Truck,
    },
    {
        name: 'Powiązania',
        route: 'product-supplier.index',
        accent: 'bg-emerald-500',
        icon: Link2,
    },
];

export default function Dashboard(_props: PageProps) {
    return (
        <AuthenticatedLayout
            header={<PageHeader title="Panel sklepu" />}
        >
            <Head title="Panel sklepu" />

            <PageContainer>
                <div className="grid gap-4 sm:grid-cols-2">
                    {modules.map((mod) => {
                        const Icon = mod.icon;
                        return (
                            <Link
                                key={mod.route}
                                href={route(mod.route)}
                                className="shop-module-card group border-l-4 border-l-transparent hover:border-l-indigo-500"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${mod.accent} text-white shadow-sm`}
                                    >
                                        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-700">
                                        {mod.name}
                                    </h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
