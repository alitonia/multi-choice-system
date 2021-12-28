import styled from "styled-components";

export const StyledExamCard = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: var(--white);
    color: var(--primary);
    border: 3px solid var(--primary);
    border-radius: 16px;
    box-sizing: border-box;
    padding: 8px;
    line-height: 16px;

    .exam-name {
        line-height: 21px;
    }

    .teacher {
        color: var(--purple);
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    & > div {
        margin-bottom: 8px;
    }

    &::before {
        content: "";
        height: 64px;
        border: 2px solid var(--primary);
        box-sizing: border-box;
        border-radius: 16px 16px 0px 0px;
        margin-bottom: 8px;
    }

    &::after {
        content: "";
        height: 32px;
        border: 2px solid var(--primary);
        box-sizing: border-box;
        border-radius: 0 0 16px 16px;
        margin-top: 8px;
    }
`;
