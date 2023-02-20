import { useDispatch, useSelector } from "react-redux";

interface RootState {
    exampleData?: string;
}

export default function Testredux() {
    const dispatch = useDispatch();
    const exampleData = useSelector((state: RootState) => state.exampleData);
    function handleClick() {
        dispatch({
            type: "EXEMPLE_ACTION",
            payload: "Novo dados de exemple",
        });
        console.log(exampleData);
    }
    return (
        <div>
            <p>aqui {exampleData}</p>
            <button onClick={handleClick}>Atualizar dados de exemplo</button>
        </div>
    );
}
