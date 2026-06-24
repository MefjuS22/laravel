import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Card from '@/Components/Shop/Card';
import FormActions from '@/Components/Shop/FormActions';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, PageProps, Product } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Edit({ product, categories }: PageProps<{ product: Product; categories: Category[] }>) {
    const { data, setData, put, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        is_active: product.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader title="Edytuj produkt" subtitle={product.name} />
            }
        >
            <Head title="Edytuj produkt" />
            <PageContainer narrow>
                <Card>
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="category_id" value="Kategoria *" />
                            <select
                                id="category_id"
                                className="shop-select w-full"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                required
                            >
                                <option value="">Wybierz kategorię</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category_id} className="mt-2" />
                        </div>
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
                        <div>
                            <InputLabel htmlFor="price" value="Cena (zł) *" />
                            <TextInput
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                required
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>
                        <FormActions
                            cancelHref={route('products.index')}
                            processing={processing}
                        />
                    </form>
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
