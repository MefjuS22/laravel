import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Card from '@/Components/Shop/Card';
import FormActions from '@/Components/Shop/FormActions';
import PageContainer from '@/Components/Shop/PageContainer';
import PageHeader from '@/Components/Shop/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product, ProductSupplier, Supplier } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Edit({
    productSupplier,
    products,
    suppliers,
}: PageProps<{ productSupplier: ProductSupplier; products: Product[]; suppliers: Supplier[] }>) {
    const { data, setData, put, processing, errors } = useForm({
        product_id: productSupplier.product_id || '',
        supplier_id: productSupplier.supplier_id || '',
        stock_quantity: productSupplier.stock_quantity ?? 0,
        is_active: productSupplier.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(route('product-supplier.update', productSupplier.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader title="Edytuj powiązanie" />
            }
        >
            <Head title="Edytuj powiązanie" />
            <PageContainer narrow>
                <Card>
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel htmlFor="product_id" value="Produkt *" />
                            <select
                                id="product_id"
                                className="shop-select w-full"
                                value={data.product_id}
                                onChange={(e) => setData('product_id', e.target.value)}
                                required
                            >
                                <option value="">Wybierz produkt</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.product_id} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="supplier_id" value="Dostawca *" />
                            <select
                                id="supplier_id"
                                className="shop-select w-full"
                                value={data.supplier_id}
                                onChange={(e) => setData('supplier_id', e.target.value)}
                                required
                            >
                                <option value="">Wybierz dostawcę</option>
                                {suppliers.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.supplier_id} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="stock_quantity" value="Stan magazynowy *" />
                            <TextInput
                                id="stock_quantity"
                                type="number"
                                min="0"
                                className="mt-1 block w-full"
                                value={data.stock_quantity}
                                onChange={(e) => setData('stock_quantity', Number(e.target.value))}
                                required
                            />
                            <InputError message={errors.stock_quantity} className="mt-2" />
                        </div>
                        <FormActions
                            cancelHref={route('product-supplier.index')}
                            processing={processing}
                        />
                    </form>
                </Card>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
