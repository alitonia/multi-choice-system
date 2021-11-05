import styled from "styled-components";

export const HeaderWrapper = styled.header`
    background-color: #548ca8;
    color: #ffffff;
    padding: 12px 16px;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    .logo {
        font-size: 48px;
    }
    .login-user {
        align-self: flex-end;
    }
    .login-user .username {
        color: #ffffff;
    }
`;
