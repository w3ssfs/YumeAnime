import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const saveFavorite = async (mal_id) => {
        if (!user) return;

        const ref = doc(db, "users", user.uid, "favorites", mal_id.toString());

        await setDoc(ref, {
            mal_id,
            savedAt: serverTimestamp(),
        });
    };

    const removeFavorite = async (mal_id) => {
        if (!user) return;

        const ref = doc(db, "users", user.uid, "favorites", mal_id.toString());
        await deleteDoc(ref);
    };

    const getFavorites = async () => {
        if (!user) return [];

        const ref = collection(db, "users", user.uid, "favorites");
        const snap = await getDocs(ref);

        return snap.docs.map((doc) => doc.data().mal_id);
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                setUser(null);
                setLoading(false);
                return;
            }

           
            const baseUser = {
                uid: currentUser.uid,
                email: currentUser.email,
                nickname: currentUser.displayName || "Usuário",
                avatar: currentUser.photoURL || null,

                createdAt: currentUser.metadata.creationTime
                    ? new Date(currentUser.metadata.creationTime)
                    : null,
            };

            setUser(baseUser);
            setLoading(false);

            try {
                const ref = doc(db, "users", currentUser.uid);
                const snap = await getDocs(ref);

                if (snap.exists()) {
                    const data = snap.data();

                    setUser((prev) => ({
                        ...prev,
                        nickname: data.nickname ?? prev.nickname,

                        createdAt:
                            data.createdAt && typeof data.createdAt.toDate === "function"
                                ? data.createdAt.toDate()
                                : prev.createdAt,
                    }));
                }
            } catch (err) {
                console.warn(
                    "Firestore offline, usando dados do Auth:",
                    err.message
                );
            }
        });

        return () => unsub();
    }, []);




    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
    };


    const register = async (email, password, nickname) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", cred.user.uid), {
            nickname,
            email,
            provider: "password",
            createdAt: serverTimestamp(),
        });

        navigate("/");
    };

    
    const loginWithGoogle = async () => {
        const cred = await signInWithPopup(auth, googleProvider);

        const ref = doc(db, "users", cred.user.uid);
        const snap = await getDocs(ref);

        if (!snap.exists()) {
            await setDoc(ref, {
                nickname: cred.user.displayName || "Usuário",
                email: cred.user.email,
                avatar: cred.user.photoURL,
                provider: "google",
                createdAt: serverTimestamp(),
            });
        }

        navigate("/");
    };

    
    const logout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                loginWithGoogle,
                logout,
                saveFavorite,
                removeFavorite,
                getFavorites
            }}
        >

            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
