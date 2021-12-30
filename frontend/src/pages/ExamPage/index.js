import React from "react";
import Header from "../../components/header/Header";
import styles from "./ExamPage.module.css";

const ExamPage = () => {
    return (
        <div>
            <Header />
            <div className={styles.content}>
                <img src="logo192.png" alt="exam" />
                <h1>Exam Name</h1>
                <p>Subject name</p>
                <p>Class of: Teacher</p>
                <p>Starts on: hh:mm AM, MM/DD/YYYY</p>
                <p>You will have t minutes to finish the exam.</p>
                <p>Once you begin, you cannot restart the exam. Ready?</p>
                <button className={styles.beginButton}>Begin the exam</button>
            </div>
        </div>
    );
};

export default ExamPage;
