import styled from "styled-components";

export const HeaderWrapper = styled.header`
    background-color: var(--secondary);
    color: var(--white);
    padding: 12px 24px;
`;

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;

    .auth-user {
        align-self: flex-end;
    }
    .login-user .username {
        color: var(--white);
    }
    .logout-btn {
        background-color: var(--primary);
        color: var(--white);
        border-radius: 8px;
        border: none;
        outline: none;
        cursor: pointer;
        float: right;
        margin-top: 8px;
        padding: 4px 8px;

        transition: background-color 0.3s ease;

        &:hover {
            background-color: var(--primary-hover);
        }
    }
`;
