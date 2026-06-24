import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Card from '@/Components/Shop/Card';
import FormActions from '@/Components/Shop/FormActions';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Supplier } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Edit({ supplier }: PageProps<{ supplier: Supplier }>) {
    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name || '',
        email: supplier.email || '',
        phone: supplier.phone || '',
        is_active: supplier.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(route('suppliers.update', supplier.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader title="Edytuj dostawcę" subtitle={supplier.name} />
            }
        >
            <Head title="Edytuj dostawcę" />
            <PageContainer narrow>
                <Card>
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="name" value="Nazwa *" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="E-mail *" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="phone" value="Telefon" />
                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>
                        <FormActions
                            cancelHref={route('suppliers.index')}
                            processing={processing}
                        />
                    </form>
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
