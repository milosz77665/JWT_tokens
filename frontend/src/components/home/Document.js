import styles from "@/styles/home/document.module.css";

export default function Document({ title, content }) {
  return (
    <div className={styles.documentContainer}>
      <h2 className={styles.documentTitle}>{title}</h2>
      <p className={styles.documentContent}>{content}</p>
    </div>
  );
}
