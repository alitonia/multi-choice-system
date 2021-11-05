import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    ExamList,
    ExamListWrapper,
    MainViewBody,
    MainViewHeader,
    MainViewWrapper,
    StyledExamSearch,
    UserWelcoming
} from "./MainView.styles";

ExamSearch.propTypes = {
    onExamSearch: PropTypes.func
};

function ExamSearch(props) {
    const [exam, setExam] = useState("");

    const handleExamChange = e => setExam(e.target.value);
    const handleClickSearch = e => {
        e.preventDefault();
        props.onExamSearch(exam);
    };

    return (
        <StyledExamSearch>
            <div className="title">YOUR EXAMS</div>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Search for an exam..."
                    onChange={handleExamChange}
                />
                <button onClick={handleClickSearch}>Search</button>
            </div>
        </StyledExamSearch>
    );
}

function RecentExamList() {
    return (
        <ExamListWrapper>
            <div className="title">RECENT</div>
            <ExamList></ExamList>
        </ExamListWrapper>
    );
}

function AllExamList() {
    // get exam list from redux state
    const examList = [];

    return (
        <ExamListWrapper>
            <div className="title">ALL</div>
            <ExamList></ExamList>
        </ExamListWrapper>
    );
}

export default function MainView() {
    // get user from redux state
    const username = "he";
    const userType = 1;

    const onExamSearch = exam => {
        console.log(exam);
    };

    return (
        <MainViewWrapper>
            <MainViewHeader>
                <ExamSearch onExamSearch={onExamSearch} />
                <UserWelcoming>Welcome back, {username}</UserWelcoming>
            </MainViewHeader>
            <hr className="separator" />
            <MainViewBody>
                <div className="create-exam-btn">
                    {userType === 1 ? <button>Create New Exam</button> : null}
                </div>
                <RecentExamList />
                <AllExamList />
            </MainViewBody>
        </MainViewWrapper>
    );
}
