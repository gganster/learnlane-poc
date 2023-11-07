import { createContext, useContext, useEffect, useState} from "react";

const initialState = {
  isConnected: false,
  user: null,
};

const AuthProviderContext = createContext(initialState);

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(initialState);

  const login = async () => {

  }
  const logout = async () => {

  }

  return (
    <AuthProviderContext.Provider value={{auth, login, logout}}>
      {children}
    </AuthProviderContext.Provider>
  )
}

