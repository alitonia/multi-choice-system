import { Wrapper, Header, Content, LoginTextArea, HeaderLogo, Logo } from "./LoginPage.styles.js";

import LoginPanel from "../../components/LoginPanel";

const LoginPage = () => (
    <Wrapper>
        <Header>
            <HeaderLogo>
                <Logo>Logo</Logo>
            </HeaderLogo>
        </Header>
        <Content>
            <LoginTextArea>
                <span>Login</span>
                <p>
                    Log in to use our services. Make sure your account has been created by your
                    instructor
                </p>
            </LoginTextArea>
            <LoginPanel></LoginPanel>
        </Content>
    </Wrapper>
);

export default LoginPage;
