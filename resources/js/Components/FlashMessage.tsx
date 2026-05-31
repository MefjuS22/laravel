import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [flash]);

    if (!visible) return null;

    const className = flash?.error
        ? 'mb-4 rounded-md bg-red-100 px-4 py-3 text-sm text-red-800'
        : 'mb-4 rounded-md bg-green-100 px-4 py-3 text-sm text-green-800';

    return <div className={className}>{message}</div>;
}
