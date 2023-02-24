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
import { thunkApiPlataforms } from "../thunks/apiplataformsTunks";
import store, { AppDispatch } from "../store";
const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
    ////////////////
    console.log(
        "csrfToken from get getServerSideProps",
        props.csrfTokenGetServerSide
    );
    const [csrfToken, setCsrfToken] = useState(null);
    const dispatch = useDispatch<AppDispatch>();
    const apicsrfToken = useSelector(
        (state: any) => state.sliceApiLoadState.data
    );
    const apiplataformsResults = useSelector(
        (state: any) => state.slicePlataForms.data
    );
    //TESTE
    useEffect(() => {
        if (props.token) {
            dispatch(thunkCsrfToken(props.token));
        }
    }, [props.token, dispatch]);

    useEffect(() => {
        setCsrfToken(apicsrfToken);
    }, [apicsrfToken]);

    ////////////////////////////////////////

    // if (props.token && csrfToken) {
    //where dispatch?
    //     thunkApiPlataforms({
    //         csrfToken: apicsrfToken,
    //         propstoken: props.token,
    //     });
    // }

    useEffect(() => {
        if (props.token && csrfToken) {
            dispatch(
                thunkApiPlataforms({
                    csrfToken: apicsrfToken,
                    propstoken: props.token,
                })
            );
        }
    }, [props.token, dispatch, csrfToken, apicsrfToken]);
    // console.log("apiplataformsResults Seletor:", apiplataformsResults);
    // useEffect(() => {
    //     setCsrfToken(apicsrfToken);
    //     console.log("Frontend apicsrfToken!:", apicsrfToken);
    // }, [apicsrfToken]);
    ////////

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
        axios({
            method: "post",
            url: "./api/game_all_information/all",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken,
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
                {/* <div
                    onClick={() => {
                        dispatch(thunkCsrfToken(props.token));
                    }}
                >
                    Write a csrfTojken on Redux slice1
                </div>
                <div
                    onClick={async () => {
                        console.log(await apicsrfToken);
                    }}
                >
                    Redux slice1 data
                </div>
                <div
                    onClick={async () => {
                        await dispatch(
                            ////
                            thunkApiPlataforms({
                                csrfToken: apicsrfToken,
                                propstoken: props.token,
                            })
                            ////
                        );
                    }}
                >
                    Write a csrfTojken on Redux slice2 Plataforms
                </div> */}
            </main>
            <div
                onClick={() => {
                    console.log(apiplataformsResults);
                }}
            >
                dataPlataforms
            </div>
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
