import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./ExamPage.module.css";
import {useParams} from "react-router-dom";

const ExamPage = () => {
    const [info, setInfo] = useState({});
    let jwtToken =
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUwMDAsImV4cCI6MTY0MDcyNDEwNy44MzI2MjAxfQ.S5QTCWhCbj-8ZCRw1XIF6IWjJUf920we1p_a4-cdqdw";
    const { id } = useParams();
    useEffect(() => {
        // console.log(id)
        // // we fetch data here
        // setInfo({
        //     "subject": "DB",
        //     "duration": "02:35:00",
        //     "creator": {
        //         "account_id": 4997,
        //         "department": "Natural Science",
        //         "name": "test_examiner"
        //     },
        //     "exam_name": "Third done alitonia test",
        //     "start_time": "2021-12-28T23:05:06",
        //     "exam_id": 4,
        //     "questions": [
        //         20,
        //         21,
        //         22,
        //         23,
        //         24
        //     ]
        // });
        setLoading(true)
        let newHeader = new Headers();
        newHeader.append("Authorization", jwtToken);
        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/get/" + id, {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                setInfo(result);
            })
            .catch(error => {console.log("error", error); setLoading(false)});
    }, []);
    const hhmmyyToMin = (duration) => {
        if(typeof duration==="undefined" || duration ===null) return 0;
        let hms = duration;
        let a = hms.split(':');
        let min = (+a[0]) * 60 + (+a[1]) + (+a[2])/60;
        return min;
    }
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
            (day < 10 ? "0" : "") +
            day.toString() +
            "/" +
            (month < 9 ? "0" : "") +
            (month+1).toString() +
            "/" +
            year.toString()
        );
    };

    function moveToExam() {
        window.location.href="../questionPage/"+id.toString()
    }

    const timeToUnix = (time) => {
        if(typeof time==="undefined" || time ===null) return 0;
        return typeof (new Date(time)).getTime()
    }

    const [loading, setLoading] = useState(false);

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
