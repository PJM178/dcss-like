import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleOnKeyDown(ev: React.KeyboardEvent<HTMLDivElement>) {
    ev.stopPropagation();

    if (ev.code === "Escape") {
      props.onClose();
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      setShouldRender(true);
    }
  }, [props.isOpen])

  // Focus modal so that keyboard events are captured by react event handler
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [shouldRender]);

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
          ref={modalRef}
          tabIndex={-1}
          onKeyDownCapture={handleOnKeyDown}
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