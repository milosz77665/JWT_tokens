import styles from "../styles/modalBackground.module.css";

export default function ModalBackground({ children, className, onClick = () => {} }) {
  const classes = className ? `${className} ${styles.modalBackground}` : styles.modalBackground;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
