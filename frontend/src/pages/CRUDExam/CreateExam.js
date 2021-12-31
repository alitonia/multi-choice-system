import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import styles from "./EditExam.module.scss";
import axios from "axios";
import CRUDHeader from "./CRUDHeader";
import CRUDTable from "./CRUDTable";
import { useHistory } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const CreateExam = () => {
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        console.log(token);
    }, []);

    const handleSubmit = async (examName, subjectName, startTime, duration) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            exam_name: examName,
            subject: subjectName,
            start_time: startTime,
            duration: duration
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/v1/exam/new", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));

        history.push("/dashboard");
    };
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <CRUDHeader headerType="CREATE" />
                <CRUDTable handleSubmit={handleSubmit} />
            </div>
            <Footer />
        </div>
    );
};

export default CreateExam;
