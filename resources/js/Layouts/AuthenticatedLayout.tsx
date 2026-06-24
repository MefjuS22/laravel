import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import FlashMessage from '@/Components/FlashMessage';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    FolderTree,
    LayoutDashboard,
    Link2,
    LogOut,
    Menu,
    Package,
    Truck,
    User,
    X,
} from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

const navItems = [
    { label: 'Panel', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Kategorie', route: 'categories.index', icon: FolderTree },
    { label: 'Produkty', route: 'products.index', icon: Package },
    { label: 'Dostawcy', route: 'suppliers.index', icon: Truck },
    { label: 'Powiązania', route: 'product-supplier.index', icon: Link2 },
];

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const isActive = (routeName: string) => route().current(routeName);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50">
            <nav className="relative z-50 border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center gap-3">
                                <Link href={route('dashboard')} className="flex items-center gap-2">
                                    <ApplicationLogo className="block h-8 w-auto fill-current text-indigo-600" />
                                    <span className="hidden text-lg font-semibold tracking-tight text-slate-800 sm:inline">
                                        Sklep
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden sm:-my-px sm:ms-8 sm:flex sm:space-x-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <NavLink
                                            key={item.route}
                                            href={route(item.route)}
                                            active={isActive(item.route)}
                                        >
                                            <Icon
                                                className="h-4 w-4 shrink-0"
                                                strokeWidth={2}
                                                aria-hidden
                                            />
                                            {item.label}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-800 focus:outline-none"
                                            >
                                                <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                                {user.name}
                                                <ChevronDown
                                                    className="-me-0.5 ms-2 h-4 w-4 text-slate-400"
                                                    strokeWidth={2}
                                                    aria-hidden
                                                />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                                        <Dropdown.Link href={route('profile.edit')}>
                                            <User className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                            Profil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                            Wyloguj
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" strokeWidth={2} aria-hidden />
                                ) : (
                                    <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' border-t border-slate-100 sm:hidden'
                    }
                >
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <ResponsiveNavLink
                                    key={item.route}
                                    href={route(item.route)}
                                    active={isActive(item.route)}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                                        {item.label}
                                    </span>
                                </ResponsiveNavLink>
                            );
                        })}
                    </div>

                    <div className="border-t border-slate-200 pb-3 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-slate-800">
                                {user.name}
                            </div>
                            <div className="text-sm text-slate-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 px-2">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                <span className="inline-flex items-center gap-2">
                                    <User className="h-4 w-4" strokeWidth={2} aria-hidden />
                                    Profil
                                </span>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden />
                                    Wyloguj
                                </span>
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
                    <FlashMessage />
                </div>
                {children}
            </main>
        </div>
    );
}
