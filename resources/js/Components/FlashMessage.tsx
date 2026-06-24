import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const isError = Boolean(flash?.error);

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

    useEffect(() => {
        if (!visible) return;

        const timer = window.setTimeout(() => setVisible(false), 5000);
        return () => window.clearTimeout(timer);
    }, [visible, message]);

    if (!visible) return null;

    const className = isError
        ? 'mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm'
        : 'mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-sm';

    return (
        <div className={className} role="status">
            {isError ? (
                <AlertCircle
                    className="h-5 w-5 shrink-0 text-red-600"
                    strokeWidth={2}
                    aria-hidden
                />
            ) : (
                <CheckCircle2
                    className="h-5 w-5 shrink-0 text-emerald-600"
                    strokeWidth={2}
                    aria-hidden
                />
            )}
            <span className="flex-1">{message}</span>
            <button
                type="button"
                onClick={() => setVisible(false)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Zamknij"
            >
                <X className="h-4 w-4" strokeWidth={2} />
            </button>
        </div>
    );
}
