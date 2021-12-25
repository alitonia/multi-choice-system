import React from "react";
import Header from "../../components/header/Header";
import styles from "./EditExam.module.scss";
import Grid from "@mui/material/Grid";
import CRUDHeader from "./CRUDHeader";
import CRUDTable from "./CRUDTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/footer/Footer";

const handleSubmit = () => {
    alert("Hello");
};
const EditExam = () => {
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <CRUDHeader headerType="EDIT"></CRUDHeader>
                <CRUDTable handleSubmit={handleSubmit}></CRUDTable>

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
                    <p style={{ color: "red", textDecoration: "underline" }} onClick={handleSubmit}>
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
