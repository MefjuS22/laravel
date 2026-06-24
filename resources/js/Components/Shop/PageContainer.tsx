import { PropsWithChildren } from 'react';

export default function PageContainer({
    children,
    narrow = false,
}: PropsWithChildren<{ narrow?: boolean }>) {
    return (
        <div className="shop-page">
            <div className={narrow ? 'shop-container-narrow' : 'shop-container'}>
                {children}
            </div>
        </div>
    );
}
