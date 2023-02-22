import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { thunkCsrfToken } from "../thunks/csrtokenTunks";

// interface RootState {
//     exampleData?: string;
// }

// interface RootStatEsliceApiLoadState {
//     exampleData?: any;
// }

//Don't rerender and don't use the useMemo hook. shallowEqual verify if the value changed
//if don't it don't allow new rerender in the page!!!
// //import { useSelector, shallowEqual } from 'react-redux'
// const todoIds = useSelector(selectTodoIds, shallowEqual)

// const renderedListItems = todoIds.map(todoId => {
//   return <TodoListItem key={todoId} id={todoId} />
// })

export default function Testredux(props: any) {
    const dispatch = useDispatch<AppDispatch>();
    // const csrfToken = useSelector((state) => state);
    const apicsrfToken = useSelector(
        (state: any) => state.sliceApiLoadState.data
    );
    const exampleData = useSelector(
        (state: any) => state.rootReducer.exampleData
    );
    function handleClick() {
        dispatch({
            type: "EXEMPLE_ACTION",
            payload: "Novo dados de exemple",
        });
        console.log("exampleData", exampleData);
    }
    function handleClickApi(value: any) {
        dispatch(thunkCsrfToken(value));
        console.log("apicsrfToken", apicsrfToken);
    }
    useEffect(() => {}, [apicsrfToken]);

    return (
        <>
            <div>
                <p>aqui {exampleData}</p>
                <button onClick={handleClick}>
                    Atualizar dados de exemplo
                </button>
            </div>

            <button onClick={() => handleClickApi(props)}>
                Redux Async handleClickApi
            </button>
            <div>Token {apicsrfToken}</div>
        </>
    );
}

export async function getServerSideProps(ctx: any) {
    const cookies = ctx.req.cookies;
    // console.log("cooooookie", cookies.token);
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
