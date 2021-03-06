import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../../store/actions";
import {
    Wrapper,
    InputWrapper,
    ButtonWrapper,
    StyledButton,
    ErrorMessage
} from "./LoginPanel.styles";

const LoginPanel = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const changeEmail = e => {
        setEmail(e.target.value);
    };

    const changePassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = { email, password };
        try {
            const res = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}account/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "Access-Control-Allow-Origin": true
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.status >= 400) {
                throw new Error(data.detail.message);
            }
            localStorage.setItem("access_token", data.access_token);
            dispatch({
                type: LOGIN,
                token: data.access_token,
                user: data.account
            });
            if (data.account.role.name === "admin") {
                history.push("/admin/dashboard");
            } else {
                history.push("/dashboard");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Wrapper>
            <InputWrapper>
                <input
                    type="text"
                    value={email}
                    name="username"
                    onChange={changeEmail}
                    placeholder="E-mail"
                />
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={changePassword}
                    placeholder="Password"
                />
            </InputWrapper>

            <a className="forgot-password-text" href="/forgotPassword">
                Forgot your password?
            </a>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ButtonWrapper>
                <StyledButton
                    type="submit"
                    bgcolor="#334257"
                    color="#ffffff"
                    onClick={handleSubmit}
                >
                    Login
                </StyledButton>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default LoginPanel;
