import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    ExamList,
    ExamListWrapper,
    MainViewBody,
    MainViewHeader,
    MainViewWrapper,
    StyledExamSearch
} from "./MainView.styles";
import Exam from "./Exam";

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
            <ExamList>
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
            </ExamList>
        </ExamListWrapper>
    );
}

function AllExamList() {
    return (
        <ExamListWrapper>
            <div className="title">ALL</div>
            <ExamList>
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
                <Exam
                    name="He"
                    creator="He"
                    subject="He"
                    duration="120"
                    startTime="2021-11-06T06:25:49.742Z"
                />
            </ExamList>
        </ExamListWrapper>
    );
}

export default function MainView() {
    // get user from redux state
    const name = "he";
    const role_id = 1;

    const onExamSearch = exam => {
        console.log(exam);
    };

    return (
        <MainViewWrapper>
            <MainViewHeader>
                <ExamSearch onExamSearch={onExamSearch} />
                <div className="user-welcome">
                    <span>Welcome back, {name}</span>
                </div>
            </MainViewHeader>
            <MainViewBody>
                <div className="create-exam-btn">
                    {role_id === 1 ? <button>Create New Exam</button> : null}
                </div>
                <RecentExamList />
                <AllExamList />
            </MainViewBody>
        </MainViewWrapper>
    );
}
