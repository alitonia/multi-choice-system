import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./ExamPage.module.css";

const ExamPage = () => {
    const [info, setInfo] = useState({
        examName: "",
        subjName: "",
        teacher: "",
        startTime: Date.now(),
        duration: 0
    });
    useEffect(() => {
        // we fetch data here
        setInfo({
            examName: "Thi cuối kì",
            subjName: "Lý 2",
            teacher: "Lê Tuấn",
            startTime: 1639760400000,
            duration: 60
        });
    }, []);
    const startTimeString = startTime => {
        let date = new Date(startTime);
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let trueHour, dayTime;
        if (hour === 0) {
            trueHour = 12;
            dayTime = "AM";
        } else if (hour > 0 && hour < 12) {
            trueHour = hour;
            dayTime = "AM";
        } else if (hour === 12) {
            trueHour = 12;
            dayTime = "PM";
        } else {
            trueHour = hour - 12;
            dayTime = "PM";
        }
        let min = date.getMinutes();
        return (
            (trueHour < 10 ? "0" : "") +
            trueHour.toString() +
            ":" +
            (min < 10 ? "0" : "") +
            min.toString() +
            " " +
            dayTime +
            ", " +
            (month < 10 ? "0" : "") +
            month.toString() +
            (day < 10 ? "0" : "") +
            "/" +
            day.toString() +
            "/" +
            year.toString()
        );
    };
    return (
        <div>
            <Header />
            <div className={styles.content}>
                <div>
                    <img src="logo192.png" alt="placeholder" />
                    <h1>{info.examName}</h1>
                    <p>{info.subjName}</p>
                    <p>Class of: {info.teacher}</p>
                    <p>Starts on: {startTimeString(info.startTime)}</p>
                    <p>You will have {info.duration} minutes to finish the exam.</p>
                    <p>Once you begin, you cannot retart the exam. Ready?</p>
                </div>
                <button
                    className={styles.beginButton}
                    // disabled={info.startTime + info.duration*60*1000<Date.now()||info.startTime>Date.now()}
                    disabled={false}
                >
                    {info.startTime + info.duration * 60 * 1000 < Date.now()
                        ? "The exam has been expired"
                        : info.startTime > Date.now()
                        ? "Not the time yet"
                        : "Begin the exam"}
                </button>
            </div>
            <div className={styles.backButton}>
                <button>&lt; Back</button>
            </div>
        </div>
    );
};

export default ExamPage;
