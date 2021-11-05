import React, { useState } from "react";
import PropTypes from "prop-types";

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
        <div>
            <div>YOUR EXAMS</div>
            <input type="text" placeholder="Search for an exam..." onChange={handleExamChange} />
            <button onClick={handleClickSearch}>Search</button>
        </div>
    );
}

export default function MainView() {
    // get user type from redux state
    const userType = 1;

    return <div></div>;
}
