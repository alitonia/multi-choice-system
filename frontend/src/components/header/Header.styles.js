import styled from "styled-components";

export const HeaderWrapper = styled.header`
    background-color: var(--secondary);
    color: var(--white);
    padding: 12px 24px;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;

    .login-user {
        align-self: flex-end;
    }
    .login-user .username {
        color: var(--white);
    }
`;
