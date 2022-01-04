import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../store/actions";
import { HeaderContent, HeaderWrapper } from "./Header.styles";

export default function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.common);

    const onLogoClick = e => {
        const roleId = user.role.role_id;
        if (roleId === 1) {
            history.push("/admin/dashboard");
        } else {
            history.push("/dashboard");
        }
    };

    const onLogout = e => {
        localStorage.removeItem("access_token");
        dispatch({ type: LOGOUT });
        history.push("/login");
    };

    return (
        <HeaderWrapper>
            <HeaderContent>
                <div className="logo text-2xl" onClick={onLogoClick}>
                    MEOW
                </div>
                <div className="auth-user">
                    <div className="login-user text-large">
                        Currently logged in as&nbsp;
                        <a className="username" href={`/account/edit/${user?.account_id}`}>
                            {user?.name}
                        </a>
                    </div>
                    <button className="logout-btn text-base" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </HeaderContent>
        </HeaderWrapper>
    );
}
