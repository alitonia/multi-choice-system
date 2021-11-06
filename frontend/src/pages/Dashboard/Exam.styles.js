import styled from "styled-components";

export const StyledExam = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #ffffff;
    color: #334257;
    border: 3px solid #334257;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 8px;
    font-size: 14px;
    line-height: 16px;

    .exam-name {
        font-size: 18px;
        line-height: 21px;
    }

    .teacher {
        color: #cc00ff;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    &::before {
        content: "";
        height: 64px;
        border: 2px solid #334257;
        box-sizing: border-box;
        border-radius: 16px 16px 0px 0px;
        margin-bottom: 8px;
    }

    &::after {
        content: "";
        height: 32px;
        border: 2px solid #334257;
        box-sizing: border-box;
        border-radius: 0 0 16px 16px;
        margin-top: 8px;
    }
`;
