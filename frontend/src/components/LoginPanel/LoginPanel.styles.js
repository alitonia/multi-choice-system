import styled from "styled-components";

export const Wrapper = styled.div`
    background: #ffffff;
    border-radius: 32px;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    width: 500px;
    /* height: 380px; */

    .forgot-password-text {
        margin-bottom: 10px;
        font-family: Roboto;
        font-size: 16px;
        line-height: 19px;

        color: #334257;
    }
`;

export const InputWrapper = styled.div`
    width: 100%;

    input {
        width: 100%;
        margin-bottom: 24px;
        line-height: 24px;

        border: 2px solid #b5b2b2;
        box-sizing: border-box;
        border-radius: 8px;

        padding: 8px 10px;
    }

    input::placeholder {
        font-family: ABeeZee;
        font-size: 20px;
        line-height: 20px;
        color: #b5b2b2;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0;

    & > * {
        width: 100%;
    }

    span {
        text-align: center;
        color: #334257;
        margin: 20px 0;
    }
`;

export const StyledButton = styled.button`
    padding: 6px 0;
    background: ${props => props.bgcolor || "#FFFFFF"};
    color: ${props => props.color || "#000000"};
    border-radius: 8px;
    font-size: 20px;
`;

export const ExternalLogin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0;
`;

export const ErrorMessage = styled.p`
    color: red;
`;
