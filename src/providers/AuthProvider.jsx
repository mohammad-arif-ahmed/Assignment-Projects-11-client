import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import axios from "axios";

import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // register
  const createUser = (email, password) => {

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  };

  // login
  const loginUser = (email, password) => {

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  };

  // google login
  const googleLogin = () => {

    return signInWithPopup(
      auth,
      googleProvider
    );

  };

  // logout
  const logoutUser = () => {

    return signOut(auth);

  };

  // update profile
  const updateUserProfile = (updatedData) => {

    return updateProfile(
      auth.currentUser,
      updatedData
    );

  };

  // auth observer
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, async (currentUser) => {

        setUser(currentUser);

        if (currentUser?.email) {

          const userInfo = {
            email: currentUser.email,
          };

          await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            userInfo,
            {
              withCredentials: true,
            }
          );

        }

        setLoading(false);

      });

    return () => unsubscribe();

  }, []);

  const authInfo = {

    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile,

  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;