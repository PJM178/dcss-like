import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (props.isOpen) {
      setShouldRender(true);
    }
  }, [props.isOpen])

  const handleOnTransitionEnd = () => {
    if (!props.isOpen) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    createPortal(
      < div
        className={`${styles["backdrop"]} ${props.isOpen ? styles["backdrop--open"] : styles["backdrop--closed"]}`.trim()}
        onClick={() => props.onClose()}
        onTransitionEnd={handleOnTransitionEnd}
      >
        <div
          className={styles["modal--content"]}
          onClick={(e) => e.stopPropagation()}
        >
          {props.children}
        </div>
      </div >,
      document.body
    )
  );
};

export default Modal;