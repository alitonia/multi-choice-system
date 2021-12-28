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
import ExamCard from "./ExamCard";
import { useSelector } from "react-redux";

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
            <div className="title text-heading">YOUR EXAMS</div>
            <div className="input-wrapper">
                <input
                    className="text-base"
                    type="text"
                    placeholder="Search for an exam..."
                    onChange={handleExamChange}
                />
                <button className="text-base" onClick={handleClickSearch}>
                    Search
                </button>
            </div>
        </StyledExamSearch>
    );
}

function RecentExamList() {
    const arr = [];
    arr.fill(
        {
            name: "He",
            creator: "He",
            subject: "He",
            duration: "120",
            startTime: "2021-11-06T06:25:49.742Z"
        },
        0,
        9
    );
    return (
        <ExamListWrapper>
            <div className="title text-heading">RECENT</div>
            <ExamList>
                {arr.map((exam, index) => {
                    return (
                        <ExamCard
                            key={index.toString()}
                            name={exam.name}
                            creator={exam.creator}
                            subject={exam.subject}
                            duration={exam.duration}
                            startTime={exam.startTime}
                        />
                    );
                })}
            </ExamList>
        </ExamListWrapper>
    );
}

function AllExamList() {
    const arr = [];
    arr.fill(
        {
            name: "He",
            creator: "He",
            subject: "He",
            duration: "120",
            startTime: "2021-11-06T06:25:49.742Z"
        },
        0,
        9
    );
    return (
        <ExamListWrapper>
            <div className="title text-heading">ALL</div>
            <ExamList>
                {arr.map((exam, index) => {
                    return (
                        <ExamCard
                            key={index.toString()}
                            name={exam.name}
                            creator={exam.creator}
                            subject={exam.subject}
                            duration={exam.duration}
                            startTime={exam.startTime}
                        />
                    );
                })}
            </ExamList>
        </ExamListWrapper>
    );
}

export default function MainView() {
    const { user } = useSelector(state => state.common);

    const onExamSearch = exam => {
        console.log(exam);
    };

    return (
        <MainViewWrapper>
            <MainViewHeader>
                <ExamSearch onExamSearch={onExamSearch} />
                <div className="user-welcome text-large">
                    <span>Welcome back, {user?.name}</span>
                    <div className="toolbox">
                        {user?.role.role_id === 2 ? (
                            <button className="create-exam-btn text-base">Create New Exam</button>
                        ) : null}
                    </div>
                </div>
            </MainViewHeader>
            <MainViewBody>
                <RecentExamList />
                <AllExamList />
            </MainViewBody>
        </MainViewWrapper>
    );
}
