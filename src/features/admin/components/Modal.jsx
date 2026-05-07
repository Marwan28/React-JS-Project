import { useEffect } from "react";
import { X } from "lucide-react";

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

export const Modal = ({ isOpen, onClose, title, children, footer, size = "md" }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
            <button
                type="button"
                aria-label="Close modal"
                className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className={`relative flex max-h-[92vh] w-full ${sizeClasses[size]} flex-col overflow-hidden rounded-t-2xl border border-gray-200 bg-white shadow-2xl transition-colors dark:border-slate-800 dark:bg-slate-900 sm:max-h-[90vh] sm:rounded-2xl`}>
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-4 dark:border-slate-800 sm:p-6">
                    <h2 className="min-w-0 truncate text-lg font-bold text-slate-950 dark:text-white sm:text-xl">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>

                {footer && (
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-end sm:p-6">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
}) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size="sm"
        footer={
            <>
                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-200 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    {cancelText}
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 dark:bg-red-700 dark:hover:bg-red-600"
                >
                    {loading ? "Deleting..." : confirmText}
                </button>
            </>
        }
    >
        <p className="text-sm leading-6 text-gray-500 dark:text-slate-400">{message}</p>
    </Modal>
);
