import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/CardAlt.module.css";
import { useDispatch, useSelector } from "react-redux";
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
    const apiplataformsResults = useSelector(
        (state: any) => state.slicePlataForms.data
    );

    const [itens, setItens] = useState([1, 2, 3, 4]);
    const games = itens;
    const urlNoServerImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Postgres_Query.jpg/1920px-Postgres_Query.jpg";
    const [urlImage, setUrlImage] = useState(urlNoServerImage);

    useEffect(() => {
        if (apiplataformsResults) {
            const urlsImagensServer = apiplataformsResults[0].result.map(
                (objeto: any) => {
                    return objeto.platform_logo.url.replace(
                        "thumb",
                        "screenshot_med"
                    );
                }
            );

            setUrlImage(urlsImagensServer);

            // console.log(
            //     "apiplataformsResults?.platform_logo?.url:",
            //     apiplataformsResults.platform_logo.url
            // );
            apiplataformsResults
                ? setItens(apiplataformsResults[0].result)
                : null;
            console.log(
                "apiplataformsResults inside useEffect",
                apiplataformsResults
            );
        }
    }, [apiplataformsResults]);

    const titles = ["Valorant", "Mw2", "RPGs", "Actions"];
    const [csrfToken, setCsrfToken] = useState("");
    // function testUrls(value: any) {
    //     const imgUrl = !value.platform_logo?.url
    //         ? "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Postgres_Query.jpg/1920px-Postgres_Query.jpg"
    //         : `https:${games.platform_logo.url}`;
    //     return imgUrl;
    //     return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Postgres_Query.jpg/1920px-Postgres_Query.jpg";
    // }
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
                                        typeof urlImage === "string"
                                            ? urlImage
                                            : `https:${urlImage[index]}`
                                    }
                                    width={584}
                                    height={480}
                                    alt={`${"changeForVariable"}`}
                                    // objectFit="cover"
                                    // objectPosition="center"
                                ></Image>
                                <div className={`${styles.perspectiveWarper}`}>
                                    <div
                                        className={`${styles.perspective}`}
                                    ></div>
                                </div>

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
