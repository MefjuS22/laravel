import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

const modules = [
    { name: 'Kategorie', route: 'categories.index', description: 'Zarządzaj kategoriami produktów' },
    { name: 'Produkty', route: 'products.index', description: 'Przeglądaj i edytuj produkty' },
    { name: 'Dostawcy', route: 'suppliers.index', description: 'Lista dostawców sklepu' },
    { name: 'Powiązania', route: 'product-supplier.index', description: 'Powiązania produktów z dostawcami' },
];

export default function Dashboard(_props: PageProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Panel sklepu
                </h2>
            }
        >
            <Head title="Panel sklepu" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="mb-6">Witaj w panelu zarządzania sklepem. Wybierz moduł:</p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {modules.map((mod) => (
                                    <Link
                                        key={mod.route}
                                        href={route(mod.route)}
                                        className="rounded-lg border border-gray-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
                                    >
                                        <h3 className="text-lg font-medium text-indigo-600">{mod.name}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{mod.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
