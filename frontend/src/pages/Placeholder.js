import {useBaseQuery} from "../hooks/queryFamily/baseQuery/useBaseQuery";
import {useState} from "react";
import {useFakeQuery} from "../hooks/queryFamily/fakeQuery/useFakeQuery";

export const Placeholder = props => {

    const [x, setX] = useState(1)
    const {data, loading, error} = useFakeQuery({
        url: 'https://fakestoreapi.com/products/' + x,
        hint: 'account'
    })

    if (error) {
        console.log(error)
        return <p>{JSON.stringify(error.message)}</p>
    }
    if (loading) {
        return 'Loading'
    }
    if (data) {
        console.log(data)
        return (
            <>
                <h3>{x}</h3>
                <p>{JSON.stringify(data, null, 2)}</p>
                <button onClick={() => setX(prevState => prevState + 1)}>+</button>
            </>)
    }

    return (
        <>
            <h1>This is a placeholder</h1>
            <h3>{JSON.stringify(props || {}, null, 2)}</h3>
        </>
    );
};
