import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

import axios from "axios";
import Link from "next/link";
import {
    HtmlHTMLAttributes,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { HtmlContext } from "next/dist/shared/lib/html-context";
import Header from "./components/Header";
import CarCompAlt from "./components/CardCompAlt";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { auth } from "../services/firebase";
import { UserContext } from "../services/auth";
import {
    getAuth,
    getIdToken,
    onAuthStateChanged,
    onIdTokenChanged,
} from "firebase/auth";
import { async } from "@firebase/util";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
    ////////////////
    const [csrfToken, setCsrfToken] = useState("");
    useEffect(() => {
        console.log("before axios :3");
        axios({
            method: "post",
            url: "./api/csrftokengenerator",
            // data: { animal: animal },
            headers: {
                "Content-Type": "application/json",
                // I have to add cookie in the GET
                // Cookie: cookies.cookies,
                // Authorization: `Bearer ${passCookie}`,
                Authorization: `Bearer ${props.token}`,
            },
        })
            .then((resposta) => {
                console.log(` setCsrfToken`, resposta.data);
                setCsrfToken(resposta.data);
            })
            .catch((error) => console.log(error));
        console.log("after axios :3");
    }, [props.token]);
    ////////////

    console.log("cookies22 from frontend", props.token);
    function getToken() {
        console.log("passCookie", passCookie);
    }
    const { passCookie, setPassCookie } = useContext(UserContext);
    console.log("passCookie!: ", passCookie);
    /////////////////////////////////////////////////////////////
    async function callApi() {
        await axios({
            method: "post",
            url: "./api/game_all_information/",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
                // I have to add cookie in the GET
                // Cookie: cookies.cookies,
                // Authorization: `Bearer ${passCookie}`,
                // Authorization: `Bearer ${passCookie}`,
                Authorization: `Bearer ${props.token}`,
            },
        })
            .then((resposta) =>
                console.log(` response from api 2`, resposta.data)
            )
            .catch((error) => console.log(error));
    }
    //////////////////////////////////////////////////////////////
    async function callApiImages(gameId: number) {
        await axios({
            method: "post",
            url: "./api/images_for_id_game",

            data: { gameId: gameId },
        })
            .then((resposta) =>
                console.log(` response from api images`, resposta.data)
            )
            .catch((error) => console.log(error));
    }

    async function callOpenIaText(animal: string) {
        await axios({
            method: "post",
            url: "./api/openAi",
            data: { animal: animal },
            headers: {
                "Content-Type": "application/json",
                // I have to add cookie in the GET
                // Cookie: cookies.cookies,
                // Authorization: `Bearer ${passCookie}`,
                Authorization: `${passCookie}`,
            },
        })
            .then((resposta) =>
                console.log(` response from api images`, resposta.data)
            )
            .catch((error) => console.log(error));
    }

    const referencial = useRef();

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>
                    Our sssfirst responsive web page with HTML5 and CSS
                </title>
                <meta
                    name="description"
                    content="A basic responsive web page – an example from Chapter 1"
                />
                <meta
                    name="viewport"
                    content="width=divice-width, initial-scale=1.0"
                />
                {/* <link rel="stylesheet" href="css/styles.css" /> */}
            </Head>

            <main>
                <Header />
                <CarCompAlt />
                {/* </section> */}
                <div>opa</div>
                <button onClick={callApi}>Verificar api</button>
                <button onClick={() => callApiImages(1615)}>
                    Verificar api Imagens
                </button>
                <button onClick={getToken}>getToken</button>
                <button onClick={() => callOpenIaText("cobra")}>
                    callOpenIaText
                </button>
                <div>token on?{csrfToken}</div>
            </main>
        </>
    );
}

export async function getServerSideProps(ctx: any) {
    const cookies = ctx.req.cookies;
    console.log("cooooookie", cookies.token);
    if (!cookies.token || cookies.token === "") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    //first get imagens

    //second give coolors
    // await axios({
    //     method: "post",
    //     url: "./api/",
    //     data: { animal: animal },
    //     headers: {
    //         "Content-Type": "application/json",
    //         // I have to add cookie in the GET
    //         // Cookie: cookies.cookies,
    //         // Authorization: `Bearer ${passCookie}`,
    //         Authorization: `${passCookie}`,
    //     },
    // })
    //     .then((resposta) =>
    //         console.log(` response from api images`, resposta.data)
    //     )
    //     .catch((error) => console.log(error));

    return {
        props: cookies,
    };
}
