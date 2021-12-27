import {useBaseQuery} from "../hooks/queryFamily/baseQuery/useBaseQuery";
import {useMemo, useState} from "react";
import {useFakeQuery} from "../hooks/queryFamily/fakeQuery/useFakeQuery";

export const Placeholder = props => {
    const [x, setX] = useState(1);

    const body = useMemo(() => {
        return {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MTY0MDQ1NDkyMS4zMTg5NDV9.3S8MJYXtkO4LyBkvezzuC7x11AXh5uiDhs6SnkSn6Zw`
            },
        }
    }, [])

    const url = `http://${process.env.REACT_APP_BACKEND_URL}accounts`

    const {data, loading, error} = useBaseQuery({
        url: url,
        hint: "account",
        data: body
    });

    if (error) {
        console.log(error);
        return <p>{JSON.stringify(error.message) + url}</p>;
    }
    if (loading) {
        return "Loading";
    }
    if (data) {
        console.log(data);
        return (
            <>
                <h3>{x}</h3>
                <p>{JSON.stringify(data, null, 2)}</p>
                <p>{process.env.REACT_APP_BACKEND_URL}</p>
                <button onClick={() => setX(prevState => prevState + 1)}>+</button>
            </>
        );
    }

    return (
        <>
            <h1>This is a placeholder</h1>
            <h3>{JSON.stringify(props || {}, null, 2)}</h3>
        </>
    );
};
