import axios from "axios";
import Image from "next/image";
import { useContext } from "react";
import styles from "../../styles/CardAlt.module.css";
import { auth } from "../../services/firebase";
import { UserContext } from "../../services/auth";
import nookies from "nookies";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import {
    getIdToken,
    onAuthStateChanged,
    onIdTokenChanged,
} from "firebase/auth";
import { GetServerSideProps } from "next";
export default function CardCompAlt(props: any) {
    console.log("props getserverside: ", props.data);
    const games = [1, 2, 3, 4];
    const titles = ["Valorant", "Mw2", "RPGs", "Actions"];

    return (
        <>
            <section className={`${styles.trywarp}`}>
                {games.map((value, index) => {
                    return (
                        <article
                            key={index}
                            className={`${styles.thisJustWork}`}
                        >
                            <a
                                href=""
                                className={`${styles.cardArchorContainer}`}
                            >
                                <Image
                                    className={`${styles.imageContainer}`}
                                    src={
                                        // "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Postgres_Query.jpg/1920px-Postgres_Query.jpg"
                                        "https://upload.wikimedia.org/wikipedia/commons/7/79/Andromeda_Galaxy_M31_-_Heic1502a_10k.jpg"
                                    }
                                    width={584}
                                    height={480}
                                    alt={`${"changeForVariable"}`}
                                    // objectFit="cover"
                                    // objectPosition="center"
                                ></Image>
                                <h3 className={`${styles.titleContainer}`}>
                                    {titles[index]}
                                </h3>
                            </a>
                        </article>
                    );
                })}
            </section>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // try {
    const { token } = nookies.get(context);
    // console.log("cooookies!:", cookies);

    // onIdTokenChanged(auth, (user) => {
    //     console.log("onIdTokenChanged inside: ", user);

    //     async function newTryToken() {
    //         if (user !== null) {
    //             const token = await getIdToken(user);
    //             return console.log("getServerSideProps2 token: ", token);
    //         }
    //     }
    //     newTryToken();
    // });

    // const cookies = await context.req;

    // } catch (error) {}
    // const {  } = context;
    // const { token } = req.cookies;

    // onAuthStateChanged(auth, (user) => {
    //     if (user !== null) {
    //         console.log("logged in!: ", user);
    //         // console.log(user);
    //     } else {
    //         return {
    //             redirect: {
    //                 destination: "/",
    //                 permanent: false,
    //             },
    //         };
    //     }
    // });
    // onIdTokenChanged(auth, (user) => {
    //     console.log("onIdTokenChanged inside: ", user);
    //     // setUserInfo(user);
    //     (async function newTryToken() {
    //         if (user !== null) {
    //             const token = await getIdToken(user);
    //             // setPassCookie(token);
    //         } else {
    //             return {
    //                 redirect: {
    //                     destination: "/",
    //                     permanent: false,
    //                 },
    //             };
    //         }
    //     });
    // });
    // const respost = await axios({
    //     method: "post",
    //     url: `${process.env.PUBLIC_NEST_DB_HOST}`,
    //     headers: {
    //         "Client-ID": `${process.env.PUBLIC_NEST_ID_CLIENT}`,
    //         Authorization: `Bearer ${process.env.PUBLIC_NEST_BEARER}`,
    //         "Content-Type": "text/plain",
    //     },
    //     data: data_text,
    // }).then((resposta) => {
    //     console.log(resposta.data);
    //     console.log('req body TTT:',req.headers.authorization)
    //     return res.status(200).json(resposta.data);
    // });

    return {
        props: { data: token }, // will be passed to the page component as props
    };
}
