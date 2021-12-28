// @flow
import { useCallback, useEffect, useRef, useState } from "react";
import * as assert from "assert";

export const useBaseQuery = (props: P) => {
    const { url, lazy = false, data: requestData } = props;

    assert.notEqual(url, undefined, "Must have URL");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mountRef = useRef(true);

    const request = useCallback(async () => {
        setLoading(true);
        setError(null);
        setData(null);

        if (mountRef.current) {
            try {
                const res = await fetch(url, requestData);
                const data = await res.json();
                if (res.status >= 400) {
                    throw new Error(data.detail);
                }
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
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
    lazy?: boolean
};
