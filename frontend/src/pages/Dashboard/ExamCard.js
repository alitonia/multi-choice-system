import React from "react";
import PropTypes from "prop-types";
import { StyledExamCard } from "./ExamCard.styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

ExamCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    subject: PropTypes.string,
    creator: PropTypes.any,
    startTime: PropTypes.string,
    duration: PropTypes.string
};

export default function ExamCard(props) {
    const { user } = useSelector(state => state.common);
    const history = useHistory();
    const { id, name, subject, creator, startTime, duration } = props;

    const onExamCardClick = e => {
        const roleId = user.role.role_id;
        if (roleId === 3) {
            history.push(`/exam/${id}`);
        } else if (roleId === 2) {
            history.push(`/editExam/${id}`);
        }
    };

    return (
        <StyledExamCard className="text-small" onClick={onExamCardClick}>
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
