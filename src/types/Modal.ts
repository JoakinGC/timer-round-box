export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: "error" | "success" | "warning" | "info"; 
}