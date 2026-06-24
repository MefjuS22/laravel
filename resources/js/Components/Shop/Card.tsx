import { PropsWithChildren } from 'react';

export default function Card({
    children,
    className = '',
}: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={`shop-card ${className}`}>
            <div className="shop-card-body">{children}</div>
        </div>
    );
}
