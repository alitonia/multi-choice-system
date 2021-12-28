import React from "react";
import { useSelector } from "react-redux";
import { HeaderContent, HeaderWrapper } from "./Header.styles";

export default function Header() {
    const { user } = useSelector(state => state.common);

    return (
        <HeaderWrapper>
            <HeaderContent>
                <div className="logo text-2xl">logo</div>
                <div className="login-user text-large">
                    Currently logged in as&nbsp;
                    <a className="username" href={`/account/edit/${user?.account_id}`}>
                        {user?.name}
                    </a>
                </div>
            </HeaderContent>
        </HeaderWrapper>
    );
}
