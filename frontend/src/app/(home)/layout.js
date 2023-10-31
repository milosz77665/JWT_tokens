import styles from "@/styles/home/homeLayout.module.css";

export default function HomeLayout({ children }) {
  return <main className={styles.main}>{children}</main>;
}
