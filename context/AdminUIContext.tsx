"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminUIContextValue {
  /** Search text entered in the header — consumed by list pages. */
  search: string;
  setSearch: (value: string) => void;
}

const AdminUIContext = createContext<AdminUIContextValue>({
  search: "",
  setSearch: () => {},
});

export function AdminUIProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  return (
    <AdminUIContext.Provider value={{ search, setSearch }}>
      {children}
    </AdminUIContext.Provider>
  );
}

export function useAdminUI() {
  return useContext(AdminUIContext);
}
