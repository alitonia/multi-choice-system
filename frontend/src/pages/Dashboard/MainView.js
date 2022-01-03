import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    ExamListWrapper,
    GridList,
    MainViewBody,
    MainViewHeader,
    MainViewWrapper,
    StyledExamSearch
} from "./MainView.styles";
import ExamCard from "./ExamCard";
import { useSelector } from "react-redux";
import Pagination from "../../components/pagination";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";

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

ExamList.propTypes = {
    examList: PropTypes.array,
    title: PropTypes.string,
    pagination: PropTypes.bool,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    onPageChange: PropTypes.func
};

function ExamList({ examList, title, pagination, currentPage, pageSize, total, onPageChange }) {
    if (!examList || examList.length === 0) {
        return null;
    }

    return (
        <ExamListWrapper>
            <div className="title text-heading">{title.toUpperCase()}</div>
            <GridList>
                {examList.map((exam, index) => {
                    return (
                        <ExamCard
                            key={index}
                            id={exam.exam_id}
                            name={exam.exam_name}
                            creator={exam.creator}
                            subject={exam.subject}
                            duration={exam.duration}
                            startTime={exam.start_time}
                        />
                    );
                })}
            </GridList>
            {pagination && (
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={onPageChange}
                />
            )}
        </ExamListWrapper>
    );
}

export default function MainView() {
    const history = useHistory();
    const { user, token } = useSelector(state => state.common);
    const [recentExamList, setRecentExamList] = useState([]);
    const [allExamList, setAllExamList] = useState([]);

    const pageSize = 30;
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);

    const onExamSearch = exam => {
        console.log(exam);
    };

    const onPageChange = page => {
        console.log(page);
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchAllExam = async () => {
            const skip = currentPage * pageSize || 0;
            const res = await fetch(
                `http://${process.env.REACT_APP_BACKEND_URL}exams/get?limit=${pageSize}&skip=${skip}`,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json; charset=utf-8",
                        "Access-Control-Allow-Origin": true,
                        authorization: `bearer ${token}`
                    }
                }
            );
            const data = await res.json();
            if (res.status >= 400) {
                console.log(data.detail.message);
            } else {
                setAllExamList(data ? data.exams : []);
                setTotal(data ? data.total : 0);
            }
        };

        if (token) {
            fetchAllExam();
        }
    }, [currentPage, token]);

    return (
        <MainViewWrapper>
            <MainViewHeader>
                <ExamSearch onExamSearch={onExamSearch} />
                <div className="user-welcome text-large">
                    <span>Welcome back, {user?.name}</span>
                    <div className="toolbox">
                        {user?.role.role_id === 2 ? (
                            <button
                                className="create-exam-btn text-base"
                                onClick={() => history.push("/createExam")}
                            >
                                Create New Exam
                            </button>
                        ) : null}
                    </div>
                </div>
            </MainViewHeader>
            <MainViewBody>
                <ExamList title="recent" examList={recentExamList} />
                <ExamList
                    title="all"
                    examList={allExamList}
                    pagination={true}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={onPageChange}
                />
            </MainViewBody>
        </MainViewWrapper>
    );
}
