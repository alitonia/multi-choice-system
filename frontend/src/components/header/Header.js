import React from "react";
import { HeaderContent, HeaderWrapper } from "./Header.styles";

export default function Header() {
    // get username from redux state
    const username = "he";

    return (
        <HeaderWrapper>
            <HeaderContent>
                <div className="logo text-2xl">logo</div>
                <div className="login-user text-large">
                    Currently logged in as&nbsp;
                    <a className="username" href="/settings">
                        {username}
                    </a>
                </div>
            </HeaderContent>
        </HeaderWrapper>
    );
}
