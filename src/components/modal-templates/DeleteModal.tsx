import { useModal } from "@/hooks/useModal"

export function DeleteModal({ onConfirm }: { onConfirm: () => void }) {
    const { closeModal } = useModal();

    return (
        <div className="space-y-4">
            <p className="text-gray-600">
                Are you sure to delete this? if Yes so click <span className="bg-blue-500 text-white p-2 rounded-md">Confirm</span>.
                <p className="my-2">
                    otherwise click the <code className="bg-gray-200 text-black px-1 font-light">X</code> button, press Escape, or click outside to close.
                </p>
            </p>
            <div className="flex gap-2 pt-4">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        try {
                            onConfirm();
                            closeModal();
                        } catch (error) {
                            console.error("Something went wrong in deletion")
                        }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}