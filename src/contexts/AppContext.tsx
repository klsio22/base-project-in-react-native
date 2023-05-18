import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const useApp = () => useContext(AppContext) as any;

const AppProvider = ({ children }: any) => {
  const [token, setToken] = useState<any>();


  useEffect(() => {
  }, [token]);

  return (
    <AppContext.Provider
      value={{ token, setToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
