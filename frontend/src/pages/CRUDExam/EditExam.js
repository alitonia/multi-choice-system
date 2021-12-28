import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./EditExam.module.scss";
import Grid from "@mui/material/Grid";
import CRUDHeader from "./CRUDHeader";
import CRUDTable from "./CRUDTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router";
import axios from "axios";

const EditExam = () => {
    const { id } = useParams();
    const [examData, setExamData] = useState();

    useEffect(() => {
        getData();
    }, []);

    const handleEditSubmit = async (examName, subjectName, startTime, duration) => {
        console.log(examName, subjectName, startTime, duration);
        const article = {
            exam_id: id,
            exam_name: examName,
            subject: subjectName,
            start_time: startTime,
            duration: duration
        };
        console.log(JSON.stringify(article));
        try {
            const res = await axios
                .put(`http://` + process.env.REACT_APP_BACKEND_URL + `exam/edit`, article, {
                    headers: {
                        Authorization:
                            "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ5OTcsImV4cCI6MTY0MDY3ODcwNS43MzEwNDYyfQ.8QhQgE8wX47L2GUWK_Sg2p85uYwBDXqZZexxO_I6_gY"
                    }
                })
                .then(response => console.log(response));
            console.log(res.status);
            if (res.status === 200) {
                setExamData(res.data);
                console.log(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getData = async () => {
        console.log(id);
        try {
            const res = await axios.get(
                `http://` + process.env.REACT_APP_BACKEND_URL + `exam/get/${id}`,
                {
                    headers: {
                        Authorization:
                            "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ5OTcsImV4cCI6MTY0MDY3ODcwNS43MzEwNDYyfQ.8QhQgE8wX47L2GUWK_Sg2p85uYwBDXqZZexxO_I6_gY"
                    }
                }
            );
            console.log(res.status);
            if (res.status === 200) {
                setExamData(res.data);
                console.log(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <CRUDHeader headerType="EDIT"></CRUDHeader>
                <CRUDTable data={examData} handleSubmit={handleEditSubmit}></CRUDTable>

                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <div className={styles.CRUDHeader}>EXAMINEES</div>
                        <button className={styles.editButton}>Edit Examinees</button>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={styles.CRUDHeader}>QUESTION</div>
                        <button className={styles.editButton}>Edit Question</button>
                    </Grid>
                </Grid>
                <div className={styles.centerText}>
                    <p style={{ color: "red" }}>
                        The exam is in progress. You may not change examninees nor question
                    </p>
                    <p>or</p>
                    <p
                        style={{ color: "red", textDecoration: "underline" }}
                        onClick={handleEditSubmit}
                    >
                        Delete this exam
                    </p>
                </div>
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

export default EditExam;
