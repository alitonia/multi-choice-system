import styled from "styled-components";

export const MainViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 24px 16px;
`;

export const MainViewHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    padding: 16px 0;
    margin-bottom: 16px;
    border-bottom: 2px solid #334257;

    .user-welcome {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 2px solid #334257;
        border-radius: 16px;
        padding: 8px;
        width: 30%;
        color: #334257;
        font-size: 20px;

        .toolbox {
            display: flex;
            justify-content: center;
            margin-top: 16px;

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
                margin: 0 4px;

                &:hover {
                    background-color: #3f5068;
                }
            }
        }
    }
`;

export const StyledExamSearch = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        font-size: 32px;
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

export const MainViewBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 24px;

    & > * {
        margin-bottom: 16px;
    }
`;

export const ExamListWrapper = styled.div`
    .title {
        font-size: 32px;
        color: #334257;
        margin-bottom: 16px;
    }
`;

export const ExamList = styled.div`
    display: grid;
    row-gap: 40px;
    column-gap: 40px;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;
