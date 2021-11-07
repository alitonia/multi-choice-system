import { useState } from "react";
import {
    Wrapper,
    InputWrapper,
    ButtonWrapper,
    StyledButton,
    ExternalLogin
} from "./LoginPanel.styles";

const LoginPanel = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState(false);

    const changeUsername = e => {
        setUsername(e.target.value);
    };

    const changePassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = e => {
        const payload = { username, password };
        console.log(payload);
    };

    const handleGoogleLogin = () => {
        console.log("Logged in with google");
    };

    const handleOutlookLogin = () => {
        console.log("Logged in with Outlook");
    };

    return (
        <Wrapper>
            {/* {error && <div className="error">There was an error!</div>} */}

            <InputWrapper>
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={changeUsername}
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
            <ButtonWrapper>
                <StyledButton bgcolor="#334257" color="#ffffff" onClick={handleSubmit}>
                    Login
                </StyledButton>

                <span>or</span>

                <ExternalLogin>
                    <StyledButton onClick={handleGoogleLogin}>Continue with Google</StyledButton>
                    <StyledButton bgcolor="#000000" color="#ffffff" onClick={handleOutlookLogin}>
                        Continue with Outlook
                    </StyledButton>
                </ExternalLogin>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default LoginPanel;
