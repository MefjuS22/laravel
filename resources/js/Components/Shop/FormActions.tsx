import { Link } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { ReactNode } from 'react';

export default function FormActions({
    cancelHref,
    processing,
    children = 'Zapisz',
}: {
    cancelHref: string;
    processing?: boolean;
    children?: ReactNode;
}) {
    return (
        <div className="flex gap-3 border-t border-slate-100 pt-6">
            <button type="submit" disabled={processing} className="btn-primary">
                <Save className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                {children}
            </button>
            <Link href={cancelHref} className="btn-secondary">
                <X className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Anuluj
            </Link>
        </div>
    );
}
