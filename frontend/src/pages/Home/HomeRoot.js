import React, { useEffect } from "react";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { useHistory } from "react-router-dom";

export const HomeRoot = () => {
    const history = useHistory();
    const loggedIn = isLoggedIn();

    useEffect(() => {
        console.log("here");
        if (loggedIn) {
            history.push("/dashboard");
        } else {
            history.push("/login");
        }
    }, [loggedIn]);

    return null;
};
