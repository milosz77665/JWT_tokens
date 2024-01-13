"use client";
import styles from "@/styles/home/documentGrid.module.css";
import loadingSpinnerStyles from "@/styles/loadingSpinner.module.css";
import Document from "./Document";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import LoadingSpinner from "../LoadingSpinner";

export default function DocumentGrid() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      const token = getCookie("jwt");
      try {
        // Wysyłanie żądania dotyczącego dokumentów z tokenem w nagłówku
        const response = await fetch("http://localhost:5000/documents", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const documentsData = data.documents;
        console.log(`Documents for user: ${data.documents.map((document) => document.title)}`);
        setDocuments(documentsData);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }

    fetchDocuments();
  }, []);

  return (
    <div className={styles.documentGrid}>
      {isLoading ? (
        <LoadingSpinner className={loadingSpinnerStyles.documentGrid} />
      ) : (
        documents.map((document) => {
          return <Document key={document.id} title={document.title} content={document.content} />;
        })
      )}
    </div>
  );
}
