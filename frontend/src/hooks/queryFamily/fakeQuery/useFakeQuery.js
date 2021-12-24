// @flow
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as assert from "assert";
import { hintDict } from "./hintDict";

const BASE_DELAY = 2000;

export const useFakeQuery = (props: P) => {
    const { url, lazy = false, data: requestData, hint, delay = BASE_DELAY } = props;

    assert.notEqual(url, undefined, "Must have URL");
    assert.notEqual(hint, undefined, "Must have hint");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mountRef = useRef(true);

    const request = useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);

        return new Promise(_ =>
            setTimeout(() => {
                if (mountRef.current) {
                    setLoading(false);
                    setData(hintDict[hint]);
                    setError(null);
                }
            }, delay)
        );
    }, [url, requestData, mountRef, setLoading, setData, setError]);

    useEffect(() => {
        return () => (mountRef.current = false);
    }, [mountRef]);

    useEffect(() => {
        if (mountRef.current && !lazy) {
            request();
        }
    }, [mountRef, lazy, request]);

    return {
        data,
        loading,
        error,
        refetch: request
    };
};

type P = {
    url: string,
    data?: {
        method: "GET" | "POST" | "PUT" | "DELETE"
    },
    lazy?: boolean,
    delay?: number,
    hint: string
};
