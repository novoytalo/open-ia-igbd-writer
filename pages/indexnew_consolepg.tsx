import Head from "next/head";
import { Inter } from "@next/font/google";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CarCompAlt from "./components/CardCompAlt";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { thunkCsrfToken } from "../thunks/csrtokenTunks";
import { thunkApiPlataforms } from "../thunks/apiplataformsTunks";
import { thunkApiOpenAI } from "../thunks/apiopenaiTunks";
import store, { AppDispatch } from "../store";
const inter = Inter({ subsets: ["latin"] });
import { ReturnData, Versions } from "./../types/index";
import { RootState } from "../store";
import axios from "axios";
import { refreshToken } from "firebase-admin/app";
export default function PageConsoleInformation(props: any) {
    // const list useMemo
    const [aiListText, setAiListText] = useState([]);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleThunkCsrfToken = useCallback(() => {
        dispatch(thunkCsrfToken(props.token));
        console.log("USEEFFECT 1 Token");
    }, [props.token, dispatch]);

    useEffect(() => {
        handleThunkCsrfToken();
    }, [handleThunkCsrfToken]);

    ////////////////////////////////////////

    const { id: idPg } = router.query;
    const apiplataformsResults = useSelector(
        (state: RootState) => state.slicePlataForms.data
    );

    const apicsrfToken = useSelector(
        (state: RootState) => state.sliceApiLoadState.data
    );
    const apiopenAi = useSelector(
        (state: RootState) => state.sliceOpenAI.dataList
    );
    const apiopenAiData = useSelector(
        (state: RootState) => state.sliceOpenAI.data
    );
    const handleThunkApiPlataforms = useCallback(() => {
        if (apicsrfToken && props.token) {
            dispatch(
                thunkApiPlataforms({
                    csrfToken: apicsrfToken,
                    propstoken: props.token,
                })
            );
        }
    }, [apicsrfToken, props.token, dispatch]);

    useEffect(() => {
        handleThunkApiPlataforms();
        console.log("USEEFFECT 2 ListForm");
    }, [handleThunkApiPlataforms]);

    const dataPlataForms = console.log(
        "apiplataformsResults component Display",
        apiplataformsResults
    );
    const plataFormData: ReturnData = apiplataformsResults?.find(
        (value: any) => {
            return value.id === Number(idPg);
        }
    );

    const handleThunkApiOpenAI = useCallback(() => {
        if (plataFormData) {
            plataFormData.versions.forEach((value, index) => {
                const apiopenAiList = apiopenAi[index];
                if (value && !apiopenAiList) {
                    dispatch(
                        thunkApiOpenAI({
                            csrfToken: apicsrfToken,
                            propstoken: props.token,
                            textToApi: value.summary,
                        })
                    );
                }
            });
        }
        console.log("USEEFFECT 3 OpenAI");
    }, [apicsrfToken, props.token, dispatch, apiopenAi, plataFormData]);

    useEffect(() => {
        handleThunkApiOpenAI();
    }, [handleThunkApiOpenAI]);

    //////////////////////////////////////////////////////////////

    if (!plataFormData) {
        //use the Redux to get state loading... after
        return <div>Loading...</div>;
    }

    // console.log("plataFormData.versions>:", plataFormData.versions[0].summary);

    return (
        <>
            <div>Console Plaform Information id: {idPg}</div>
            <div>{plataFormData.name}</div>
            <div>{plataFormData.platform_logo.url}</div>
            {plataFormData.versions.map((value, index) => {
                return (
                    <div key={index}>
                        <div>
                            Summary {`${index}`}`:{value.summary}
                        </div>
                        <div>OpenAI Text:</div>
                        {<div>{apiopenAi[index]}</div>}
                        {/* {apiopenAi.map((value, index) => (
                            <div key={index}>
                                Intern text{`${index}`}
                                {value}
                            </div>
                        ))} */}
                        {/* <button
                            onClick={() => {
                                dispatch(
                                    thunkApiOpenAI({
                                        csrfToken: apicsrfToken,
                                        propstoken: props.token,
                                        textToApi: "waaw34521213",
                                    })
                                );
                                console.log(
                                    "-*********",
                                    apiopenAi,
                                    "Fim ******"
                                );
                            }}
                        >
                            Escrever redux
                        </button> */}
                    </div>
                );
            })}
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
