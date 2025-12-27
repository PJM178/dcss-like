import styles from "./Buttons.module.css";

type Variant = "wrapper";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: Variant;
}

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  
  return (
    <button
      className={`${styles["button--base"]} ${styles["button--wrapper"]}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};