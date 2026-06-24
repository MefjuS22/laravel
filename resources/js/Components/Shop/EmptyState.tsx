import { Inbox } from 'lucide-react';

export default function EmptyState({ message }: { message: string }) {
    return (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
            <Inbox
                className="mx-auto mb-3 h-10 w-10 text-slate-300"
                strokeWidth={1.5}
                aria-hidden
            />
            <p className="text-sm text-slate-500">{message}</p>
        </div>
    );
}
