import { ModalProps } from "../../types/Modal";
import "../../styles/Toast.css";

const Toast = ({ isOpen, onClose, message, type = "error" }:ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={`toast-container toast-${type}`}>
            <span>{message}</span>
            <button className="toast-close" onClick={onClose}>&times;</button>
        </div>
    );
};

export default Toast;
