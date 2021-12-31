import React from "react";
import { isLoggedIn } from "../../utils/isLoggedIn";
import "./404.scss";

export const Page404 = () => {
    const loggedIn = isLoggedIn();

    const redirectedPath = loggedIn ? "/dashboard" : "/login";
    const buttonText = loggedIn ? "Back to dashboard" : "Back to login";

    return (
        <div className={"container-404"}>
            <h3 className={"text-404"}>404</h3>
            <div className={"button-404-container"}>
                <a href={redirectedPath}>
                    <button type={"button"} className={"button-404-to-dashboard"}>
                        {buttonText}
                    </button>
                </a>
            </div>
        </div>
    );
};
