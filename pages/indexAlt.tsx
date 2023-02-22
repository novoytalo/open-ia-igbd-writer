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
import { useDispatch, useSelector } from "react-redux";
import { thunkCsrfToken } from "../thunks/csrtokenTunks";
import { AppDispatch } from "../store";
const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
    ////////////////

    const [csrfToken, setCsrfToken] = useState("");
    //THIS LOGIC GO TO REDUX ASYNC LOGIC, DELETE IT IN THE FUTURE!!
    //Just for reference
    // useEffect(() => {
    //     axios({
    //         method: "post",
    //         url: "./api/csrftokengenerator",
    //         // data: { animal: animal },
    //         headers: {
    //             "Content-Type": "application/json",
    //             // I have to add cookie in the GET
    //             // Cookie: cookies.cookies,
    //             // Authorization: `Bearer ${passCookie}`,
    //             Authorization: `Bearer ${props.token}`,
    //         },
    //     })
    //         .then((resposta) => {
    //             setCsrfToken(resposta.data);
    //         })
    //         .catch((error) => console.log(error));
    // }, [props.token]);
    ////////////
    const dispatch = useDispatch<AppDispatch>();
    const apicsrfToken = useSelector(
        (state: any) => state.sliceApiLoadState.data
    );
    useEffect(() => {
        dispatch(thunkCsrfToken(props.token));
        console.log("frontEnd thunps props.token:", props.token);
    }, [props.token, dispatch]);

    useEffect(() => {
        setCsrfToken(apicsrfToken);
        console.log("Frontend apicsrfToken!:", apicsrfToken);
    }, [apicsrfToken]);

    ////////////////////////////////////////

    function getToken() {
        console.log("passCookie", passCookie);
    }
    const { passCookie, setPassCookie } = useContext(UserContext);

    /////////////////////////////////////////////////////////////
    async function callApi() {
        await axios({
            method: "post",
            url: "./api/game_all_information/all",
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

    useEffect(() => {
        //outside just a geral exemple
        //const [data1, setData1] = useState(null);
        //const [data2, setData2] = useState(null);
        //inside useEffect
        // const fetchData = async () => {
        //     const [response1, response2] = await Promise.all([
        //       axios.get("https://api.example.com/data1"),
        //       axios.get("https://api.example.com/data2"),
        //     ]);
        //     setData1(response1.data);
        //     setData2(response2.data);
        //   };
        //   fetchData();
        axios({
            method: "post",
            url: "./api/game_all_information/all",
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
                console.log(` response from api all`, resposta.data)
            )
            .catch((error) => console.log(error));
        axios({
            method: "post",
            url: "./api/game_all_information/date",
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
                console.log(` response from api date`, resposta.data)
            )
            .catch((error) => console.log(error));
        axios({
            method: "post",
            url: "./api/game_all_information/search",
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
            //my text search in this case "sonic"
            data: "sonic the hedgehog",
        })
            .then((resposta) =>
                console.log(` response from api search`, resposta.data)
            )
            .catch((error) => console.log(error));
    }, [csrfToken, props.token]);
    //////////////////////////////////////////////////////////////
    async function callApiImages(gameId: number) {
        await axios({
            method: "post",
            url: "./api/game_all_information/images_for_id_game",

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
                Authorization: `Bearer ${props.token}`,
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
    // console.log("cooooookie", cookies.token);
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
