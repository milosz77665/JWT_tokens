"use client";
import ErrorAlert from "@/components/home/ErrorAlert";
import { createContext, useState } from "react";

export const ErrorContext = createContext();

export function ErrorContextProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);

  function showError(error) {
    setErrorMessage(error);
  }

  function hideError() {
    setErrorMessage(null);
  }

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {children} {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
    </ErrorContext.Provider>
  );
}
