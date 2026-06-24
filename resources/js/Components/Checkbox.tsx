import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-slate-300 bg-white text-indigo-600 shadow-sm focus:ring-indigo-500 focus:ring-offset-0 ' +
                className
            }
        />
    );
}
