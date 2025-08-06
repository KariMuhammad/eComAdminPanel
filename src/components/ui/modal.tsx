import { ModalContext } from "@/context/modal-context";
import { useModal } from "@/hooks/useModal";
import { X } from "lucide-react";
import { useContext, useEffect } from "react";

export default function Modal() {
    const context = useContext(ModalContext);

    if (!context) {
        console.error("<Modal /> Component work only under ModalProvider")
    }

    const { title, children, isOpen, size, closeModal } = useModal();

    console.log("IsOpen", isOpen)

    useEffect(() => {
        const handleEscape = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") closeModal();
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent Body Scroll when Modal is Open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        }
    }, [isOpen])

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4"
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black opacity-75 transition-opacity"
                onClick={closeModal}
            />

            {/* Modal */}
            <div className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}