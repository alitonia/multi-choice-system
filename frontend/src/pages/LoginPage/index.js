// import React from 'react'
import {
  LoginSubText,
  Wrapper,
  Header,
  Content,
  LoginText,
  HeaderLogo,
  Logo,
} from "./LoginPage.styles.js";

import LoginPanel from "../../components/LoginPanel";

const LoginPage = () => (
  <Wrapper>
    <Header>
      <HeaderLogo>
        <Logo>Logo</Logo>
      </HeaderLogo>
    </Header>
    <Content>
      <LoginText>Login</LoginText>
      <LoginSubText>
        Log in to use our services. Make sure your account has been created by
        your instructor
      </LoginSubText>
      <LoginPanel></LoginPanel>
    </Content>
  </Wrapper>
);

export default LoginPage;
