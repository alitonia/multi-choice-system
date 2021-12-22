import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./ExamPage.module.css";
import {useParams} from "react-router-dom";

const ExamPage = () => {
    const [info, setInfo] = useState({
        exam_id: '',
        exam_name: '',
        subject: '',
        creator: {name: ""},
        start_time: Date.now(),
        duration: 0,
    });
    const { id } = useParams();
    useEffect(() => {
        console.log(id)
        // we fetch data here
        setInfo({
            exam_id: '2110',
            exam_name: 'exam_name_10',
            subject: 'subject_10',
            creator: {
                id: 1,
                department: 'defence against the dark art',
                name: 'alitonia_10'
            },
            start_time: 1640186007857,
            duration: 190
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

    function moveToExam() {
        window.location.href="../questionPage/"+id.toString()
    }

    return (
        <div>
            <Header />
            <div className={styles.content}>
                <div>
                    <img src="https://yt3.ggpht.com/ytc/AKedOLRKkvGBaNzKlDVVL7RGRQtDyNJr6GAP8Oh8Uggi=s900-c-k-c0x00ffffff-no-rj" alt="placeholder" />
                    <h1>{info.exam_name}</h1>
                    <p>{info.subject}</p>
                    <p>Class of: {info.creator.name}</p>
                    <p>Starts on: {startTimeString(info.start_time)}</p>
                    <p>You will have {info.duration} minutes to finish the exam.</p>
                    <p>Once you begin, you cannot restart the exam. Ready?</p>
                </div>
                <button
                    className={styles.beginButton}
                    // disabled={info.startTime + info.duration*60*1000<Date.now()||info.startTime>Date.now()}
                    disabled={false}
                    onClick={moveToExam}
                >
                    {info.start_time + info.duration * 60 * 1000 < Date.now()
                        ? "The exam has been expired"
                        : info.start_time > Date.now()
                        ? "Not the time yet"
                        : "Begin the exam"}
                </button>
            </div>
            <div className={styles.backButton}>
                <a href={"/dashboard"}><button>&lt; Back</button></a>
            </div>
        </div>
    );
};

export default ExamPage;
