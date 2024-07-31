import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            // console.log('got user: ', user);
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
            // console.log('Document data:', docSnap.data());
        } else {
            // console.log('No such document!');
        }
    }

    const login = async (email, password) => {
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        } catch (error) {
            let msg = error.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid Email';
            if (msg.includes('(auth/invalid-credential)')) msg = 'Wrong Credentials';
            return {success: false, msg};
        }
    }

    const logout = async () => {
        try{
            await signOut(auth);
            return {success: true};
        } catch (error) {
            return {success: false, msg: error.message, error: error};
        }
    }

    const register = async (email, password, username, profileUrl) => {
        try{
            const responce = await createUserWithEmailAndPassword(auth, email, password);
            // console.log('responce.user: ', responce?.user);

            await setDoc(doc(db, 'users', responce?.user?.uid), {
                username,
                profileUrl,
                userId: responce?.user?.uid,
            });
            return {success: true, data: responce?.user};
        } catch (error) {
            let msg = error.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Email is already in use';
            return {success: false, msg};
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return value;
}