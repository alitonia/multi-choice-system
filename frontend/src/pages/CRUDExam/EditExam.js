import React from "react";
import Header from "../../components/header/Header";
import styles from "./EditExam.module.scss";
import CRUDHeader from "./CRUDHeader";

const handleSubmit = () => {
    alert("Hello");
};
const EditExam = () => {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <CRUDHeader headerType="EDIT"></CRUDHeader>
                <div className={styles.wrapperTable}>
                    <table>
                        <tbody>
                            <tr>
                                <table className={styles.innerTable}>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{ textAlign: "right", paddingRight: "15px" }}
                                            >
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
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ textAlign: "right", paddingRight: "15px" }}
                                            >
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
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ textAlign: "right", paddingRight: "15px" }}
                                            >
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
                                                ></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ textAlign: "right", paddingRight: "15px" }}
                                            >
                                                Duration
                                            </td>
                                            <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                                                t minutes
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: "center"
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Change duration in minutes ..."
                                                    className={styles.inputField}
                                                ></input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "center" }}>
                                    <button className={styles.submitButton} onClick={handleSubmit}>
                                        Save change
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EditExam;
