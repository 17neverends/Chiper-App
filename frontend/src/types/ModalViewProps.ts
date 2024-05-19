import EncryptionData from "./EncryptionData";

interface ModalViewProps {
    title: string;
    data: EncryptionData | null;
    visible: boolean;
    onClose: () => void;
}

export default ModalViewProps;