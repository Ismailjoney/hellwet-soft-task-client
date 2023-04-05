import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';


export  const AuthContext = createContext()
const auth = getAuth(app)

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const loginProvider = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const updateUser = (userInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }
    const logOut = () => {
        return signOut(auth);
    }

    const emailVerify = () => {
        return sendEmailVerification(auth.currentUser)

    }
    const passReset = email => {
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {
        setLoading(true)
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        singin,
        updateUser,
        loginProvider,
        emailVerify,
        logOut,
        passReset,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextProvider;