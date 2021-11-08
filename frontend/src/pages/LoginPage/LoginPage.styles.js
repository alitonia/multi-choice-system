import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #334257;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0;
    padding: 40px 200px;
    justify-content: space-between;
    align-items: center;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 256px;

    background: #548ca8;
`;

export const HeaderLogo = styled.div`
    width: 138px;
    height: 85px;
`;

export const Logo = styled.div`
    font-family: ABeeZee;
    font-style: normal;
    font-weight: normal;
    font-size: 72px;
    line-height: 85px;
    text-align: center;

    color: #eeeeee;
`;

export const LoginTextArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;

    color: #ffffff;
    /* padding: 30px; */

    span {
        font-family: ABeeZee;
        font-style: normal;
        font-weight: normal;
        font-size: 96px;
        line-height: 113px;
    }

    p {
        font-family: ABeeZee;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;

        margin-top: 30px;
    }
`;
