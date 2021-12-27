import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./ExamPage.module.css";
import {useParams} from "react-router-dom";

const ExamPage = () => {
    const [info, setInfo] = useState({});
    let jwtToken =
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUwMDAsImV4cCI6MTY0MDYzNzA5Mi44ODUyMzN9.0_JqHr0mTwOTEWlws3V1l2SJdLjgaDxxYMl7NywMh3s";
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
            {(!loading&&info!==null)?
                <div>
                    <div className={styles.content}>
                        <div>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRKkvGBaNzKlDVVL7RGRQtDyNJr6GAP8Oh8Uggi=s900-c-k-c0x00ffffff-no-rj" alt="placeholder" />
                            <h1>{info.exam_name}</h1>
                            <p>Subject: {info.subject}</p>
                            <p>Class of: {typeof info.creator === "undefined"?"":info.creator.name}</p>
                            <p>Starts on: {startTimeString(info.start_time)}</p>
                            <p>You will have {typeof info.duration === "undefined"? "":hhmmyyToMin(info.duration).toString()} minutes to finish the exam.</p>
                            <p>Once you begin, you cannot restart the exam. Ready?</p>
                        </div>
                        <button
                            className={styles.beginButton}
                            disabled={(new Date(info.start_time)).getTime() + hhmmyyToMin(info.duration)*60*1000<Date.now()||(new Date(info.start_time)).getTime()>Date.now()}
                            // disabled={false}
                            onClick={moveToExam}
                        >
                            {(new Date(info.start_time)).getTime() + hhmmyyToMin(info.duration)*60*1000 < Date.now()
                                ? "The exam has been expired"
                                : (new Date(info.start_time)).getTime() > Date.now()
                                ? "Not the time yet"
                                : "Begin the exam"}
                        </button>
                        {/*{timeToUnix(info.start_time) + hhmmyyToMin(info.duration)*60*1000 }*/}
                    </div>
                    <div className={styles.backButton}>
                        <a href={"/dashboard"}><button>&lt; Back</button></a>
                    </div>
                </div>
                :(info!==null?
                    <div>
                        <h1 style={{display: "flex", justifyContent: "center"}}>Loading</h1>
                    </div>:
                    <div>
                        <h1 style={{paddingLeft: "1.5rem"}}>You don&#39;t have the permission to view this exam</h1>
                        <div className={styles.backButton}>
                            <a href={"/dashboard"}><button>&lt; Back</button></a>
                        </div>
                    </div>)}
        </div>
    );
};

export default ExamPage;
