import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const useApp = () => useContext(AppContext) as any;

const AppProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<any>();
  export const AppContext = createContext<AppContextProps>({
    track: 0,
    prev: () => {},
    next: () => {},
    musicTime: 0,
  });

  useEffect(() => {
  }, [userId]);

  return (
    <AppContext.Provider
      value={{ userId, setUserId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
