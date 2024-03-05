import { createContext, useEffect, useContext, useState } from "react";
import {
    createUserWithEmailAndPassword,
     onAuthStateChanged,
      signOut,
       signInWithEmailAndPassword,
       signInWithPopup,
       GoogleAuthProvider,
    } from 'firebase/auth'
import { auth } from "../firebase";

const UserContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState("");

  function signUp(email,password){
    return createUserWithEmailAndPassword(auth, email,password);
  }

  function logIn(email,password){
    return signInWithEmailAndPassword(auth, email, password);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
    })
    return()=>{
        unsubscribe();
    }
  },[]);

  const contextValue = {
    user,
    signUp,
    logIn,
    signOut,
    googleSignIn,
  };

    return(
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export function UserAuth(){
    return useContext(UserContext);

}