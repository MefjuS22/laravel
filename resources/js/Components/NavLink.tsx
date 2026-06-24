import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center gap-1.5 border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-500 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
