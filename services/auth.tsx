import { async } from "@firebase/util";
import CryptoJS from "crypto-js";
import nookies, { destroyCookie, parseCookies, setCookie } from "nookies";
import {
    getIdToken,
    onAuthStateChanged,
    onIdTokenChanged,
    User,
} from "firebase/auth";
import { Cookie } from "next-auth/core/lib/cookie";
import React, {
    useState,
    useEffect,
    useContext,
    createContext,
    useMemo,
} from "react";
import { auth } from "./firebase";
import axios from "axios";
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

    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            console.log("logged in!: ", user);
            // console.log(user);
        } else {
            console.log("No user");
        }
    });
    onIdTokenChanged(auth, (user) => {
        // console.log("onIdTokenChanged inside: ", user);
        setUserInfo(user);
        async function newTryToken() {
            if (user !== null) {
                const token = await getIdToken(user);
                const keyNull =
                    process.env.NEXT_PUBLIC_MY_SECRET_KEY === undefined
                        ? ""
                        : process.env.NEXT_PUBLIC_MY_SECRET_KEY;
                const key = keyNull.toString();

                await axios({
                    method: "post",
                    url: "./api/cookiewithcript",
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        // I have to add cookie in the GET
                        // Cookie: cookies.cookies,
                        // Authorization: `Bearer ${passCookie}`,
                        // Authorization: `Bearer ${passCookie}`,
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((resposta) =>
                        console.log(` response from api 2`, resposta.data)
                    )
                    .catch((error) => console.log(error));
            } else {
                console.log("cookie DESTROY!");
                setPassCookie(undefined);
                destroyCookie(undefined, "token", { path: "/" });
            }
        }
        newTryToken();
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
