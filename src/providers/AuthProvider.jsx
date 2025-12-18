
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    updateProfile
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config'; 
import axios from 'axios';

// 1. Context Create
export const AuthContext = createContext(null);


const baseURL = import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000' 
    : 'https://contesthub-server-amber.vercel.app/'; 

export const axiosPublic = axios.create({
    baseURL: baseURL,
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Firebase Providers
    const googleProvider = new GoogleAuthProvider();

    // --- Auth Methods ---

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        return signOut(auth);
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userInfo = { email: currentUser.email };

                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            console.log('JWT Token received and saved.');
                            setLoading(false); 
                        }
                    })
                    .catch(error => {
                        console.error('JWT Token fetch error:', error);
                        setLoading(false); 
                    });

            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }

            return () => {
                unsubscribe();
            };
        });

        return () => {
            unsubscribe();
        };

    }, []); 

    // Context Value
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;