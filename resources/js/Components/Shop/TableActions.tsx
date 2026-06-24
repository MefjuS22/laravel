import { Link } from '@inertiajs/react';
import { Ban, Eye, Pencil } from 'lucide-react';

export default function TableActions({
    showHref,
    editHref,
    onDeactivate,
}: {
    showHref: string;
    editHref: string;
    onDeactivate: () => void;
}) {
    return (
        <div className="flex flex-wrap justify-end gap-3">
            <Link href={showHref} className="btn-ghost">
                <Eye className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Pokaż
            </Link>
            <Link href={editHref} className="btn-ghost">
                <Pencil className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Edytuj
            </Link>
            <button type="button" onClick={onDeactivate} className="btn-danger">
                <Ban className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                Dezaktywuj
            </button>
        </div>
    );
}
