import { useRef } from "react";
import styles from "./Buttons.module.css";

type Variant = "wrapper" | "primary";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: Variant;
}

export const Button = (props: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cancelClick = useRef<boolean>(false);
  const { children, variant, onClick, ...rest } = props;

  const buttonStyle = {
    wrapper: styles["button--wrapper"],
    primary: styles["button--primary"]
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    cancelClick.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = buttonRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
  
    if (!inside) cancelClick.current = true;

    e.currentTarget.releasePointerCapture(e.pointerId);
  };



  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (cancelClick.current) {
      e.preventDefault();
      e.stopPropagation();

      return;
    }

    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      className={`${styles["button--base"]} ${buttonStyle[variant]}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};