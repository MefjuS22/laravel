import { PaginationLink } from '@/types';
import { Link } from '@inertiajs/react';

interface PaginationProps {
    links: PaginationLink[];
}

export default function Pagination({ links }: PaginationProps) {
    if (!links || links.length <= 3) return null;

    return (
        <nav
            className="mt-6 flex flex-wrap items-center justify-center gap-1 border-t border-slate-100 pt-4"
            aria-label="Paginacja"
        >
            {links.map((link, index) =>
                link.url ? (
                    <Link
                        key={index}
                        href={link.url}
                        className={`min-w-[2.25rem] rounded-lg px-3 py-1.5 text-center text-sm font-medium transition ${
                            link.active
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={index}
                        className="min-w-[2.25rem] rounded-lg border border-transparent px-3 py-1.5 text-center text-sm text-slate-300"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ),
            )}
        </nav>
    );
}
