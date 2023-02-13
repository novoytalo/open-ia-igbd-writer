import { async } from "@firebase/util";
import CryptoJS from "crypto-js";
import nookies, { parseCookies, setCookie } from "nookies";
import {
    getIdToken,
    onAuthStateChanged,
    onIdTokenChanged,
    User,
} from "firebase/auth";
import { Cookie } from "next-auth/core/lib/cookie";
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
interface interInicialState {
    isOpen: boolean;
    setIsOpen: (newState: boolean) => void;
    userInfo: User | null;
    setUserInfo: (newState: User | null) => void;
    passCookie: string | undefined;
    setPassCookie: (newState: string | undefined) => void;
}

const inicialState = {
    isOpen: false,
    setIsOpen: () => {},
    userInfo: null,
    setUserInfo: () => {},
    passCookie: undefined,
    setPassCookie: () => {},
};

export const UserContext = createContext<interInicialState>(inicialState);

export default function AuthProvider({ children }: any) {
    const [isOpen, setIsOpen] = useState(inicialState.isOpen);
    const [passCookie, setPassCookie] = useState<string | undefined>(
        inicialState.passCookie
    );
    const [userInfo, setUserInfo] = useState<User | null>(
        inicialState.userInfo
    );
    // useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            console.log("logged in!: ", user);
            // console.log(user);
        } else {
            console.log("No user");
        }
    });
    onIdTokenChanged(auth, (user) => {
        console.log("onIdTokenChanged inside: ", user);
        setUserInfo(user);
        async function newTryToken() {
            //need to inplement a criptograf.

            if (user !== null) {
                const token = await getIdToken(user);
                // const tokenNoCrypto = await getIdToken(user);
                // setPassCookie(tokenNoCrypto);
                // const token = tokenNoCrypto;
                // const key = process.env.MY_SECRET_KEY?.toString()!;

                // const ciphertext = CryptoJS.AES.encrypt(token, key).toString();
                nookies.set(undefined, "token", token, {
                    // keys:process.env.,
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: true,
                    // sameSite: 'strict'
                    secret: process.env.NEXT_PUBLIC_COOKIE_SECRET,
                });
            } else {
                setPassCookie(undefined);
                // setCookie(null, 'my-cookie-name', value, { ...options, secret: process.env.NEXT_PUBLIC_COOKIE_SECRET })
                //   }
                nookies.set(undefined, "token", "", {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: true,
                    httpOnly: true,
                    // sameSite: 'strict',
                    secret: process.env.NEXT_PUBLIC_COOKIE_SECRET,
                });
            }
        }
        newTryToken();

        // const { accessToken } = user?.getIdTokenResult;
        // console.log(
        //     "token from AuthProvider",
        //     //  user?.getIdTokenResult
        //     userInfo?.getIdToken
        // );
    });
    // }, []);
    return (
        <UserContext.Provider
            value={{
                isOpen,
                setIsOpen,
                userInfo,
                setUserInfo,
                passCookie,
                setPassCookie,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
