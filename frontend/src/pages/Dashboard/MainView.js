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
import "./styles.module.css";

ExamSearch.propTypes = {
    onExamSearch: PropTypes.func,
    searchStatus: PropTypes.string
};

function ExamSearch(props) {
    const [exam, setExam] = useState("");

    const handleExamChange = e => setExam(e.target.value);
    const handleSearch = e => {
        e.preventDefault();
        props.onExamSearch(exam);
    };

    return (
        <StyledExamSearch>
            <div className="title text-heading">YOUR EXAMS</div>
            <form className="input-wrapper" onSubmit={handleSearch}>
                <input
                    className="text-base"
                    type="text"
                    name="search"
                    placeholder="Search for an exam..."
                    onChange={handleExamChange}
                />
                <button className="text-base" type="submit">
                    Search
                </button>
            </form>
            <span className="search-status">{props.searchStatus}</span>
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
    const [searchExamList, setSearchExamList] = useState([]);
    const [recentExamList, setRecentExamList] = useState([]);
    const [allExamList, setAllExamList] = useState([]);

    const pageSize = 30;
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [searchStatus, setSearchStatus] = useState("");

    const onExamSearch = async examName => {
        setSearchStatus("");
        const res = await fetch(
            `http://${process.env.REACT_APP_BACKEND_URL}exams/get?search=${examName}`,
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
            setSearchExamList(data ? data.exams : []);
            setSearchStatus(data && data.exams && data.exams.length > 0 ? "" : "No results found.");
        }
    };

    const onPageChange = page => {
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

        const fetchRecentExam = async () => {
            setRecentExamList([]);
        };

        if (token) {
            fetchAllExam();
            fetchRecentExam();
        }
    }, [currentPage, token]);

    return (
        <MainViewWrapper>
            <MainViewHeader>
                <ExamSearch onExamSearch={onExamSearch} searchStatus={searchStatus} />
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
                <ExamList title="search result" examList={searchExamList} />
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
