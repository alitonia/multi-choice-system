import styled from "styled-components";

export const HeaderWrapper = styled.header`
    background-color: #548ca8;
    color: #ffffff;
    padding: 12px 24px;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    .logo {
        font-size: 64px;
    }
    .login-user {
        align-self: flex-end;
        font-size: 20px;
    }
    .login-user .username {
        color: #ffffff;
    }
`;
