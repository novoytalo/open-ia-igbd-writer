import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function RedirectPagEx(props: any) {
    const { data: session, status } = useSession();

    useEffect(() => {}, [session]);
    console.log(props);
    return (
        <>
            {session ? (
                <div>If you see this pg you area logged</div>
            ) : (
                <div>Off</div>
            )}
        </>
    );
}

export async function getServerSideProps(context: any) {
    let res = await fetch("http://localhost:3000/api/[...nextauth]", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // I have to add cookie in the GET
            Cookie: context.req.headers.cookie,
        },
    });
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    // const data = await axios({
    //     method: "post",
    //     url: "./api/game_all_information",
    // })
    //     .then((resposta) => console.log(` response from api 2`, resposta.data))
    //     .catch((error) => console.log(error));

    if (!session) {
        return {
            redirect: {
                destination: "/test_nextauth",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            // data,
        },
    };
}
