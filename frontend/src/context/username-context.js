"use client";
import { createContext, useState } from "react";

export const UsernameContext = createContext();

export function UsernameContextProvider({ children }) {
  const [username, setUsername] = useState(null);

  return <UsernameContext.Provider value={{ username, setUsername }}>{children}</UsernameContext.Provider>;
}
