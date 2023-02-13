import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import stylesHeader from "../../styles/Header.module.css";
import Search from "./Search";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const naveRef = useRef<any[]>([]);
    const naveRefSearchButton = useRef<any>();
    function searchComponentIndex(string: string) {
        return naveRef.current.findIndex((object) => {
            return object.className.includes(`${string}`);
        });
    }
    function searchComponentIndexById(string: string) {
        return naveRef.current.findIndex((object) => {
            return object.id.includes(`${string}`);
        });
    }
    function openNav() {
        // console.log(
        //     "puch context3: ",
        //     naveRef.current.findIndex((object) => {
        //         // console.log("includes results: ", object.className);
        //         return object.className.includes("Header_BurguerMenu");
        // Heder_BurguerMenu selection className the button BurguerMenu
        //     })
        // );
        console.log("puch context4: ", naveRef.current);
        setIsOpen(true);

        naveRef.current[searchComponentIndex("Header_navMenuClose")].className =
            stylesHeader.navMenuOpen;

        naveRef.current[
            searchComponentIndexById("Seleção #1")
        ].className.baseVal = stylesHeader.lineOne;
        naveRef.current[
            searchComponentIndexById("Seleção #2")
        ].className.baseVal = stylesHeader.lineTwo;
        naveRef.current[
            searchComponentIndexById("Seleção #3")
        ].className.baseVal = stylesHeader.lineThree;
    }
    function closeNav() {
        setIsOpen(false);

        console.log("puch context: ", naveRef.current);
        naveRef.current[searchComponentIndex("Header_navMenuOpen")].className =
            stylesHeader.navMenuClosed;

        //     naveRef.current[
        //     searchComponentIndex("Header_navMenuOpen")
        // ].style.animationDirection = "reverse";

        //add too much naveRef context...!!!!! and the animation work only 1 time
        naveRef.current[
            searchComponentIndexById("Seleção #1")
        ].style.animationDirection = "reverse";
        naveRef.current[
            searchComponentIndexById("Seleção #2")
        ].style.animationDirection = "reverse";
        naveRef.current[
            searchComponentIndexById("Seleção #3")
        ].style.animationDirection = "reverse";

        // naveRef.current[
        //     searchComponentIndexById("Seleção #1")
        // ].className.baseVal.style = { "animation-fill-mode": "forwards" };
        // naveRef.current[
        //     searchComponentIndexById("Seleção #2")
        // ].className.baseVal = stylesHeader.lineTwo;
        // naveRef.current[
        //     searchComponentIndexById("Seleção #3")
        // ].className.baseVal = stylesHeader.lineThree;
    }
    function openSearch() {
        setIsSearchOpen(!isSearchOpen);
    }
    // function handleClickOutSideButtonSearch(){
    //     if (){
    //         setIsSearchOpen(false)
    //     }
    // }

    // useEffect(() => {
    //   //passado quando o componente é montado

    //   return () => {
    //     //passado quando o componente é desmontado
    //   }
    // }, [third])

    const maxRefLegth = 5;
    function pushRef(context: any) {
        if (naveRef.current.length < maxRefLegth) {
            const index = naveRef.current.push(context) - 1;
            console.log("lista foi pushada");
        }
    }
    return (
        <>
            <main className={stylesHeader.main}>
                <section ref={naveRefSearchButton}>
                    {isSearchOpen ? (
                        <Search propDrill={setIsSearchOpen} />
                    ) : null}
                </section>

                <section>
                    <nav
                        className={stylesHeader.navMenuClosedNoAnimation}
                        ref={pushRef}
                    >
                        <ul>
                            <li className={stylesHeader.liSlideItem}>
                                <Link href={"/ps5"}>PS5</Link>
                            </li>
                            <li className={stylesHeader.liSlideItem}>
                                Xbox Series X/S
                            </li>
                            <li className={stylesHeader.liSlideItem}>Switch</li>
                            <li className={stylesHeader.liSlideItem}>Tech</li>
                            <li className={stylesHeader.liSlideItem}>
                                CES 2023
                            </li>
                            <li className={stylesHeader.liSlideItem}>
                                EDITORIAS dropdown
                            </li>
                            <li className={stylesHeader.liSlideItem}>
                                CONSOLES dropdown
                            </li>
                            <li className={stylesHeader.liSlideItem}>
                                VER MAIS dropdown
                            </li>

                            <div className="dropDownChangeRegion"></div>
                        </ul>
                    </nav>
                    <div>
                        <ul
                            className={
                                isOpen
                                    ? stylesHeader.animationButtonReverse
                                    : stylesHeader.animationButton
                            }
                        >
                            <li>
                                <button
                                    ref={(localContext) =>
                                        pushRef(localContext)
                                    }
                                    className={stylesHeader.BurguerMenu}
                                    onClick={isOpen ? closeNav : openNav}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        viewBox="0 0 128 128"
                                        // className={stylesHeader.sgvBurger}
                                    >
                                        <path
                                            id="Seleção #1"
                                            // className="sgvLineInicialOne"
                                            ref={pushRef}
                                            // className={stylesHeader.lineOne}

                                            fill="black"
                                            stroke="black"
                                            strokeWidth="1"
                                            d="M 5.02,12.57
                                        C 5.02,12.57 43.00,12.00 43.00,12.00
                                            43.00,12.00 115.00,12.00 115.00,12.00
                                            118.22,12.01 123.05,11.76 125.69,13.85
                                            129.05,16.52 128.52,22.81 124.85,24.98
                                            122.80,26.19 119.35,26.00 117.00,26.00
                                            117.00,26.00 11.00,26.00 11.00,26.00
                                            8.23,25.99 4.56,26.29 2.31,24.40
                                            -1.98,20.78 -0.23,14.80 5.02,12.57 Z
                                        
                                        "
                                        />
                                        <path
                                            id="Seleção #2"
                                            // className="sgvLineInicialTwo"
                                            ref={pushRef}
                                            // className={stylesHeader.lineTwo}
                                            fill="black"
                                            stroke="black"
                                            strokeWidth="1"
                                            d="M 4.06,57.74
                                C 9.90,56.29 33.38,57.00 41.00,57.00
                                    41.00,57.00 116.00,57.00 116.00,57.00
                                    118.67,57.00 122.52,56.79 124.85,58.17
                                    128.96,60.60 128.96,67.40 124.85,69.83
                                    122.52,71.21 118.67,71.00 116.00,71.00
                                    116.00,71.00 11.00,71.00 11.00,71.00
                                    8.19,70.98 4.61,71.16 2.31,69.26
                                    -1.85,65.83 -0.05,60.25 4.06,57.74 Z"
                                        />
                                        <path
                                            id="Seleção #3"
                                            // className="sgvLineInicialThree"
                                            ref={pushRef}
                                            // className={stylesHeader.lineThree}
                                            fill="black"
                                            stroke="black"
                                            strokeWidth="1"
                                            d="M 3.15,103.02
                                C 8.85,100.99 31.48,102.00 39.00,102.00
                                    39.00,102.00 117.00,102.00 117.00,102.00
                                    119.35,102.00 122.80,101.81 124.85,103.02
                                    128.52,105.19 129.05,111.48 125.69,114.15
                                    123.05,116.24 118.22,115.99 115.00,116.00
                                    115.00,116.00 12.00,116.00 12.00,116.00
                                    9.28,115.99 5.56,116.08 3.15,114.69
                                    -1.60,111.95 -0.40,106.16 3.15,103.02 Z"
                                        />
                                    </svg>
                                </button>
                            </li>
                            <li className={stylesHeader.logoMini}>LOGO SGV</li>
                            <li className={stylesHeader.searchIcon}>
                                <button
                                    className="buttonSeachCall"
                                    onClick={openSearch}
                                >
                                    <Image
                                        src="search.svg"
                                        alt="Search"
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}
