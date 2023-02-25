import Head from "next/head";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import CarCompAlt from "./components/CardCompAlt";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { thunkCsrfToken } from "../thunks/csrtokenTunks";
import { thunkApiPlataforms } from "../thunks/apiplataformsTunks";
import store, { AppDispatch } from "../store";
const inter = Inter({ subsets: ["latin"] });

export default function PageConsoleInformation(props: any) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { id } = router.query;
    const apiplataformsResults = useSelector(
        (state: any) => state.slicePlataForms.data
    );
    console.log("apiplataformsResults component Display", apiplataformsResults);
    return (
        <>
            <div>Console Plaform Information id: {id}</div>
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
