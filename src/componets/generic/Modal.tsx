import React from "react";
import { ModalProps } from "../../types/Modal";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type = "error" }) => {
    if (!isOpen) return null;

    const colors: Record<"error" | "success" | "warning" | "info", string> = {
        error: "bg-red-600",
        success: "bg-green-600",
        warning: "bg-yellow-500",
        info: "bg-blue-600",
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className={`text-white p-3 rounded-t-lg ${colors[type]}`}>
                    <h2 className="text-lg font-bold">{title}</h2>
                </div>
                <div className="p-4 text-gray-800">
                    <p>{message}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
