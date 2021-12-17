// @flow
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import * as assert from "assert";


export const useBaseQuery = (props: P) => {
    const {
        url,
        lazy = false,
        data: requestData,
        _request = null
    } = props

    assert.notEqual(url, undefined, 'Must have URL')

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const mountRef = useRef(true)

    const request = useCallback(async () => {
        setLoading(true)
        setError(null)
        setData(null)

        return fetch(url, requestData)
            .then(res => res.json())
            .then(respondVal => {
                if (mountRef.current) {
                    setLoading(false)
                    setData(respondVal)
                    setError(null)
                }
            })
            .catch(err => {
                if (mountRef.current) {
                    setLoading(false)
                    setError(err)
                    setData(null)
                }
            })
    }, [
        url,
        requestData,
        mountRef,
        setLoading,
        setData,
        setError
    ])

    useEffect(() => {
        return () => mountRef.current = false
    }, [mountRef])

    useEffect(() => {
        if (mountRef.current && !lazy) {
            request()
        }
    }, [mountRef, lazy, request])


    return {
        data,
        loading,
        error,
        refetch: request
    }
}

type P = {
    url: string,
    data?: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    },
    lazy?: boolean
}
