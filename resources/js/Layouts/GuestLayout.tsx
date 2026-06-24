import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50/30 to-slate-100 px-4 py-10">
            <div className="mb-8 text-center">
                <Link href="/" className="inline-flex flex-col items-center gap-3">
                    <ApplicationLogo className="h-14 w-14 fill-current text-indigo-600" />
                    <span className="text-xl font-semibold tracking-tight text-slate-800">
                        Sklep
                    </span>
                </Link>
            </div>

            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg ring-1 ring-slate-900/5">
                {children}
            </div>
        </div>
    );
}
