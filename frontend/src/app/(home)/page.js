"use client";
import styles from "@/styles/home/homePage.module.css";
import { useEffect, useState } from "react";
import DocumentGrid from "@/components/home/DocumentGrid";
import LogoutIcon from "@/assets/icons/LogoutIcon";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  function handleLogout() {
    deleteCookie("jwt");
    router.push("/login");
  }

  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.title}>Document Viewer</h1>
      <p className={styles.authInfo}>
        {username} <LogoutIcon className={styles.logoutIcon} title="Logout" onClick={handleLogout} />
      </p>

      <DocumentGrid />
    </div>
  );
}
