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
