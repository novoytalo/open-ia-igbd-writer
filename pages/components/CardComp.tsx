import Image from "next/image";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "../../styles/Card.module.css";
export default function Card() {
    const refScrollableCategoryContent = useRef<any>();
    const [pixelGain, setPixelGain] = useState<number>(0);
    const [widhtScrollable, setSidhtScrollable] = useState<any>(
        refScrollableCategoryContent.current?.getBoundingClientRect().width
    );
    const listArticles = [1, 2, 3, 4];
    const textTitle = ["Vant", "Vam", "Puits", "JUmpP"];

    function reSizeScrollAble() {
        const widthRfScroll =
            refScrollableCategoryContent.current?.getBoundingClientRect().width;
        setSidhtScrollable(widthRfScroll);
        // setPixelGain(widthRfScroll - 700);
        // widthRfScroll - 700 >= 0
        //     ? setPixelGain(widthRfScroll - 700)
        //     : setPixelGain(0);
    }

    useEffect(() => {
        console.log("window size onex : ", window);

        window.addEventListener("resize", reSizeScrollAble);
        reSizeScrollAble();
        console.log("windows size:", widhtScrollable);
        return () => {
            window.removeEventListener("resize", reSizeScrollAble);
        };
    }, []);

    // In this compoent I need to get the predominant color, but
    //don't have now and it is no safe npm or a code in javascript that fast.
    //So need to implement a endpoint on Docker using Python to make this
    //math and return fast results. Or simple write one time on firebase
    //this final result. For now only fixed colors
    return (
        <>
            {" "}
            <div>
                <div>Size window: {widhtScrollable}</div>
                <button
                    onClick={() => {
                        setSidhtScrollable(
                            refScrollableCategoryContent.current?.getBoundingClientRect()

                            //offsetWidth and offsetHeight
                        );
                        console.log(
                            refScrollableCategoryContent.current?.getBoundingClientRect()
                                .width
                        );
                    }}
                >
                    refScrollableCategoryContent
                </button>
            </div>
            <section
                className={`${styles.scrollableCategoryContent}`}
                ref={refScrollableCategoryContent}
                // style={{
                //     width: "700px",
                // }}
            >
                {listArticles.map((art, index) => {
                    return (
                        <article key={index} className={`styles.Game${art}`}>
                            <a
                                href=""
                                className={`${styles.cardAnchorConteirner}`}
                                // style={{
                                //     left: `${(425 + pixelGain) * index}px`,
                                // }}
                                style={{
                                    left: `${(425 + pixelGain) * index}px`,
                                }}
                            >
                                {/* <div
                                    //just to clip width?
                                    style={{
                                        position: "absolute",
                                        overflowX: "clip",
                                        width: `${584 + pixelGain}px`,
                                        height: `${480}px`,
                                        backgroundColor: "aqua",
                                    }}
                                > */}
                                <Image
                                    // fill
                                    className={`${styles.cardImage}`}
                                    // style={{ width: `${584 - pixelGain}px` }}
                                    // width={584 + pixelGain}
                                    // height={480 + pixelGain}
                                    width={584}
                                    height={480}
                                    objectFit="cover"
                                    objectPosition="center"
                                    src={
                                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Postgres_Query.jpg/1920px-Postgres_Query.jpg"
                                    }
                                    alt="test"
                                ></Image>
                                {/* </div> */}

                                <div
                                    className={`${styles.textCardBackGround}`}
                                    // style={{
                                    //     backgroundColor: `rgb(${
                                    //         0 + index * 10
                                    //     },${0 + index * 5 * 2},${
                                    //         0 - (index * 10) / 2
                                    //     },30%)`,
                                    // }}
                                >
                                    <h2
                                        className={`${styles.cardTitleText}`}
                                    >{`${textTitle[index]}`}</h2>
                                </div>

                                {/* card.{index} */}
                            </a>
                        </article>
                    );
                })}
            </section>
        </>
    );
}
