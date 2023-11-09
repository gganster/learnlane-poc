import { createContext, useContext, useEffect, useState} from "react";
import {signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {auth as FbAuth} from "@/firebase";
import { getUserById } from "@/services/user";

const initialState = {
  loading: true,
  isConnected: false,
  user: null,
};

const AuthProviderContext = createContext(initialState);

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(initialState);

  const login = async ({email, password}) => {
    const user = await signInWithEmailAndPassword(FbAuth, email, password);
    setAuth({isConnected: true, user});
    return user;
  }
  const logout = async () => {
    await signOut(FbAuth);
    setAuth({initialState, loading: false});
  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(FbAuth, async (user) => {
      if (!user) return setAuth({initialState, loading: false});
      
      const userData = await getUserById(user.uid);
      if (!userData) return setAuth(initialState);

      setAuth({isConnected: true, user: {...user, ...userData}, loading: false});
      console.log("connected as", user.email, ` (${user.uid})`);
    });

    return () => subscribe();
  }, [])

  return (
    <AuthProviderContext.Provider value={{auth, login, logout}}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
}