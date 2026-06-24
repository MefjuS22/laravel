import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Card from '@/Components/Shop/Card';
import FormActions from '@/Components/Shop/FormActions';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Edit({ category }: PageProps<{ category: Category }>) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
        is_active: category.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader title="Edytuj kategorię" subtitle={category.name} />
            }
        >
            <Head title="Edytuj kategorię" />
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
                            <InputLabel htmlFor="description" value="Opis" />
                            <textarea
                                id="description"
                                className="shop-textarea"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                        <FormActions
                            cancelHref={route('categories.index')}
                            processing={processing}
                        />
                    </form>
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
