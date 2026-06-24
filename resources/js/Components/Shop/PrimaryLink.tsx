import { Link } from '@inertiajs/react';
import { LucideIcon, Plus } from 'lucide-react';
import { ReactNode } from 'react';

export default function PrimaryLink({
    href,
    children,
    icon: Icon = Plus,
}: {
    href: string;
    children: ReactNode;
    icon?: LucideIcon;
}) {
    return (
        <Link href={href} className="btn-primary">
            <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {children}
        </Link>
    );
}
