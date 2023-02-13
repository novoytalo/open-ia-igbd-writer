import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import stylesSearch from "../../styles/Search.module.css";

interface propsButtonSearch {
    propDrill: Dispatch<SetStateAction<boolean>>;
    // caso: number;
}

//when i click on the search button it trigger the addEventListener and close
//becouse the button is outiside or the tabe and the className found.
//a solution could be include the name of button as "inside"
//or try to interrupt the first interaction

export default function Search(props: propsButtonSearch) {
    function handledClicOut(event: any) {
        // console.log("oque sai no evento: ", event.target.parents);
        // console.log("oque sai no evento: ", event.target.className);
        // console.log("oque sai no evento: ", event.currentTarget);
        console.log("oque sai no evento: ", event.target.parentNode.className);
        // if(event.target.closest){
        const classNameFound = event.target.parentNode.className;
        if (
            classNameFound?.includes("Search_main") ||
            classNameFound?.includes("Search_formStyle") ||
            classNameFound?.includes("buttonSeachCall")
        ) {
            console.log("clicou dentro");
        } else {
            console.log("clicou fora");
            props.propDrill(false);
        }
        // }
    }
    useEffect(() => {
        document.addEventListener("click", handledClicOut);
        return () => {
            document.removeEventListener("click", handledClicOut);
        };
    }, []);

    return (
        <>
            <div className={stylesSearch.main}>
                <form action="" className={stylesSearch.formStyle}>
                    <input
                        type="text"
                        placeholder="Pesquisar no LogoY Brasil"
                    />
                    {/* <div className={stylesSearch.test}>Vermelho</div> */}
                    <button className={stylesSearch.button}>X</button>
                </form>
            </div>
        </>
    );
}
