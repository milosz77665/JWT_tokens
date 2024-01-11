import styles from "@/styles/home/homePage.module.css";
import DocumentGrid from "@/components/home/DocumentGrid";
import LogoutIcon from "@/assets/icons/LogoutIcon";

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.title}>Document Viewer</h1>
      <LogoutIcon className={styles.logoutIcon} title="Logout" />
      <DocumentGrid />
    </div>
  );
}
