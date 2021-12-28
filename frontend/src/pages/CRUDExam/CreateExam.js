import React from "react";
import Header from "../../components/header/Header";
import styles from "./EditExam.module.scss";
import axios from "axios";
import CRUDHeader from "./CRUDHeader";
import CRUDTable from "./CRUDTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/footer/Footer";

const handleSubmit = async (examName, subjectName, startTime, duration) => {
    console.log(examName, subjectName, startTime, duration);
    const article = {
        exam_name: examName,
        subject: subjectName,
        start_time: startTime + ":00",
        duration: duration
    };
    console.log(JSON.stringify(article));
    try {
        const res = await axios.post(
            `http://` + process.env.REACT_APP_BACKEND_URL + `exam/new`,
            article,
            {
                headers: {
                    Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwMDUsImV4cCI6MTY0MDY5NDM3Mi41OTIyMzUzfQ.WCg4OZM3qc0A7KOmnHBWzRk5QmRK9YRNG6iNu42MlyU"
                }
            }
        );
        console.log(res);
    } catch (error) {
        console.error(error);
    }
};

const CreateExam = () => {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <CRUDHeader headerType="CREATE"></CRUDHeader>
                <CRUDTable handleSubmit={handleSubmit}></CRUDTable>

                <div className={styles.backArrow}>
                    <ArrowBackIcon
                        style={{ color: "white", paddingTop: "5px", paddingLeft: "5px" }}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateExam;
