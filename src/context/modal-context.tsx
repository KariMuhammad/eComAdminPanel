import { ModalSizes } from "@/types";
import { createContext, useState } from "react";

type OpenModalProps = {
    size: ModalSizes;
    title: string;
    children: React.ReactNode;
}

type ModalContextType = {
    isOpen: boolean;
    title: string;
    size: ModalSizes;
    children: React.ReactNode,

    closeModal: () => void;
    openModal: (props: OpenModalProps) => void;
}

export const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    title: "",
    size: ModalSizes.sm,
    children: null,

    closeModal: () => { },
    openModal: (props: OpenModalProps) => { }
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [information, setInformation] = useState<OpenModalProps>({
        size: ModalSizes.sm,
        title: "",
        children: null
    });

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);

    const openModal = ({ size, title, children }: OpenModalProps) => {
        setInformation({ size, title, children });
        setIsOpen(true)
    };



    return (
        <ModalContext.Provider value={{ isOpen, ...information, closeModal, openModal }}>
            {children}
        </ModalContext.Provider>
    )

}