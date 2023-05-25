import { PropsWithChildren, createContext, useContext, useState } from "react";

// Define your context props
export interface AppContextProps {
 [x: string]: any;
 id?:string,
 email?:string
}

// Create a new context using default values (they'll be replaced in a moment..)
export const AppContext = createContext<AppContextProps>({
  id:'',
  email:''
});

// Create a custom context provider, so all context data will be self-contained
export default function AppContextProvider({ children }: PropsWithChildren) {
  const [userData, setUserData] = useState({  id:'',  email:''});

  const appContext: AppContextProps = {
    id: userData.id,
    email: userData.email
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}
