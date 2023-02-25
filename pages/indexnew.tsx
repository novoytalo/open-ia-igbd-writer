import Head from "next/head";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import CarCompAlt from "./components/CardCompAlt";
import { useDispatch, useSelector } from "react-redux";
import { thunkCsrfToken } from "../thunks/csrtokenTunks";
import { thunkApiPlataforms } from "../thunks/apiplataformsTunks";
import store, { AppDispatch } from "../store";
const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
    ////////////////
    const dispatch = useDispatch<AppDispatch>();
    const apicsrfToken = useSelector(
        (state: any) => state.sliceApiLoadState.data
    );
    // const apiplataformsResults = useSelector(
    //     (state: any) => state.slicePlataForms.data
    // );
    //TESTE
    useEffect(() => {
        if (props.token) {
            dispatch(thunkCsrfToken(props.token));
        }
    }, [props.token, dispatch]);

    ////////////////////////////////////////
    useEffect(() => {
        if (props.token && apicsrfToken) {
            dispatch(
                thunkApiPlataforms({
                    csrfToken: apicsrfToken,
                    propstoken: props.token,
                })
            );
        }
    }, [props.token, dispatch, apicsrfToken]);

    //////////////////////////////////////////////////////////////

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>
                    Console Information
                    {/* lol */}
                </title>
                <meta
                    name="description"
                    content="A basic responsive web page – an example"
                />
                <meta
                    name="viewport"
                    content="width=divice-width, initial-scale=1.0"
                />
            </Head>

            <main>
                <Header />
                <CarCompAlt />
            </main>
        </>
    );
}

export async function getServerSideProps(ctx: any) {
    const cookies = ctx.req.cookies;
    if (!cookies.token || cookies.token === "") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: cookies,
    };
}
