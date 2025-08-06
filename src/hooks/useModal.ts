import { useContext } from "react";
import { ModalContext } from "@/context/modal-context";

export const useModal = () => {
  const { isOpen, size, title, children, closeModal, openModal } = useContext(ModalContext);

  return { isOpen, size, title, children, openModal, closeModal };
};
