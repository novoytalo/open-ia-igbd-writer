import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/CardAlt.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { mocksCarCompAlt } from "./../../Mocks/pages/CardCompAlt";
import { ReturnData } from "./../../types/index";

export default function CardCompAlt() {
    const apiplataformsResults = useSelector(
        (state: any) => state.slicePlataForms.data
    );
    const urlNoServerImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Postgres_Query.jpg/1920px-Postgres_Query.jpg";
    const [itens, setItens] = useState(mocksCarCompAlt);
    const games = itens;

    const [urlImage, setUrlImage] = useState(urlNoServerImage);

    useEffect(() => {
        if (apiplataformsResults) {
            const urlsImagensServer = apiplataformsResults[0].result.map(
                (objeto: ReturnData) => {
                    const concatReplace = `https:${objeto.platform_logo.url.replace(
                        "thumb",
                        "screenshot_med"
                    )}`;
                    return {
                        ...objeto,
                        platform_logo: {
                            ...objeto.platform_logo,
                            url: concatReplace,
                        },
                    };
                }
            );

            setItens(urlsImagensServer);
        }
    }, [apiplataformsResults]);

    const titles = ["Valorant", "Mw2", "RPGs", "Actions"];
    const [csrfToken, setCsrfToken] = useState("");
    return (
        <>
            {" "}
            <div>Tenso: {csrfToken.toString()}</div>
            <section className={`${styles.trywarp}`}>
                {itens.map((value: ReturnData, index: number) => {
                    return (
                        <article
                            key={index}
                            className={`${styles.thisJustWork}`}
                        >
                            <Link
                                href={{
                                    pathname: `/indexnew_consolepg`,
                                    query: { id: value.id },
                                }}
                                // as={"/indexnew_consolepg"}
                                className={`${styles.cardArchorContainer}`}
                            >
                                <Image
                                    className={`${styles.imageContainer}`}
                                    src={value.platform_logo.url}
                                    width={600}
                                    height={480}
                                    alt={`${"changeForVariable"}`}
                                    // objectFit="scale-down"
                                    // objectFit="contain"
                                    // objectPosition="center"
                                ></Image>
                                <div className={`${styles.perspectiveWarper}`}>
                                    <div
                                        className={`${styles.perspective}`}
                                    ></div>
                                </div>

                                <h3 className={`${styles.titleContainer}`}>
                                    {value.name}
                                </h3>
                            </Link>
                        </article>
                    );
                })}
            </section>
        </>
    );
}
