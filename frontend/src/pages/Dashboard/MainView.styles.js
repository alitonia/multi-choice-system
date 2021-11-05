import styled from "styled-components";

export const MainViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px 16px;

    .separator {
        display: block;
        border: 0;
        border-top: 2px solid #334257;
        margin: 16px 0;
        padding: 0;
        flex: 1 0;
    }
`;

export const MainViewHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const StyledExamSearch = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        font-size: 24px;
        color: #334257;
    }

    .input-wrapper {
        display: flex;
        flex-direction: row;

        & > * {
            margin-right: 16px;
        }

        input {
            border: 2px solid #b5b2b2;
            border-radius: 8px;
            box-sizing: border-box;
            outline: none;
            font-size: 16px;
            padding: 6px 10px;
            width: 360px;

            &::placeholder {
                color: #b5b2b2;
            }
        }

        button {
            background-color: #334257;
            color: #ffffff;
            border-radius: 8px;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #3f5068;
            }
        }
    }

    & > * {
        margin-bottom: 16px;
    }
`;

export const UserWelcoming = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid #334257;
    border-radius: 16px;
    width: 30%;
    color: #334257;
`;

export const MainViewBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;

    & > * {
        margin-bottom: 16px;
    }

    .create-exam-btn {
        display: flex;
        justify-content: center;

        button {
            padding: 6px 10px;
            background-color: #334257;
            color: #ffffff;
            border-radius: 8px;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #3f5068;
            }
        }
    }
`;

export const ExamListWrapper = styled.div`
    .title {
        font-size: 24px;
        color: #334257;
    }
`;

export const ExamList = styled.div``;
