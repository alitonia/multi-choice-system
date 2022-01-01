import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./EditExam.module.scss";

const CRUDTable = ({ data, handleSubmit }) => {
    const name = "he";
    const [examName, setExamName] = useState(data ? data.exam_name : "");
    const [subjectName, setSubjectName] = useState(data ? data.subject : "");
    const [startTime, setStartTime] = useState(data ? data.start_time : "");
    const [duration, setDuration] = useState(data ? data.duration : "");

    useEffect(() => {
        setExamName(data?.exam_name);
        setSubjectName(data?.subject);
        setStartTime(data?.start_time);
        setDuration(data?.duration);
    }, [data]);

    const handleChangeName = event => {
        setExamName(event.target.value);
    };

    const handleChangeSubject = event => {
        setSubjectName(event.target.value);
    };

    const handleChangeTime = event => {
        setStartTime(event.target.value);
    };

    const handleChangeDuration = event => {
        setDuration(event.target.value);
    };

    return (
        <div className={styles.wrapperTable}>
            <table>
                <tbody>
                    <tr>
                        <table className={styles.innerTable}>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "right", paddingRight: "15px" }}>
                                        Exam name
                                    </td>
                                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                                        Exam Name
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Change exam name ..."
                                            className={styles.inputField}
                                            defaultValue={data ? data.exam_name : ""}
                                            onChange={handleChangeName}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "right", paddingRight: "15px" }}>
                                        Subject name
                                    </td>
                                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                                        Subject Name
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Change subject name ..."
                                            className={styles.inputField}
                                            defaultValue={data ? data.subject : ""}
                                            onChange={handleChangeSubject}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "right", paddingRight: "15px" }}>
                                        Start time
                                    </td>
                                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                                        hh:mm, DD/MM/YYYY
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        <input
                                            type="datetime-local"
                                            className={styles.inputField}
                                            defaultValue={data ? data.start_time : ""}
                                            onChange={handleChangeTime}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: "right", paddingRight: "15px" }}>
                                        Duration
                                    </td>
                                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                                        hh:mm
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        <input
                                            type="time"
                                            placeholder="Change duration in minutes ..."
                                            min="00:01"
                                            max="05:00"
                                            defaultValue={data ? data.duration : ""}
                                            className={styles.inputFieldSpecial}
                                            onChange={handleChangeDuration}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "center" }}>
                            <button
                                className={styles.submitButton}
                                onClick={() =>
                                    handleSubmit(examName, subjectName, startTime, duration)
                                }
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                Save change
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
CRUDTable.propTypes = {
    data: PropTypes.object,
    handleSubmit: PropTypes.func
};
export default CRUDTable;
