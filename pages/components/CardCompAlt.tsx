import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
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
export default function CardCompAlt() {
    // console.log("props CardCompAlt: ", props.token);
    const games = [1, 2, 3, 4];
    const titles = ["Valorant", "Mw2", "RPGs", "Actions"];
    const [csrfToken, setCsrfToken] = useState("");

    return (
        <>
            {" "}
            <div>Tenso: {csrfToken.toString()}</div>
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
