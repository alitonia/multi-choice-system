import React from "react";
import PropTypes from "prop-types";
import { StyledExamCard } from "./ExamCard.styles";

ExamCard.propTypes = {
    name: PropTypes.string,
    subject: PropTypes.string,
    creator: PropTypes.any,
    startTime: PropTypes.string,
    duration: PropTypes.string
};

export default function ExamCard(props) {
    const { name, subject, creator, startTime, duration } = props;
    return (
        <StyledExamCard className="text-small">
            <div className="exam-name text-title">{name}</div>
            <div className="subject">{subject}</div>
            <div className="class">
                Class of: <span className="teacher">{creator}</span>
            </div>
            <div className="start-time">{startTime}</div>
            <div className="duration">{duration}</div>
        </StyledExamCard>
    );
}
