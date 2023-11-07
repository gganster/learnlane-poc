import { createContext, useContext, useEffect, useState} from "react";
import {signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {auth as FbAuth, db} from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

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
      
      const userData = await getDoc(doc(db, "users", user.uid));
      if (!userData.exists()) return setAuth(initialState);

      setAuth({isConnected: true, user: {...user, ...userData.data()}, loading: false});
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