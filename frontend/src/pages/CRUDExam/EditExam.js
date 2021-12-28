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
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const EditExam = () => {
    const { id } = useParams();
    const [examData, setExamData] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getData();
    }, []);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        border: "2px solid #000",
        textAlign: "center",
        backgroundColor: "beige",
        p: 4
    };

    const handleEditSubmit = async (examName, subjectName, startTime, duration) => {
        console.log(duration);
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwMDUsImV4cCI6MTY0MDY5ODYzMC41NDA2MDk0fQ.dgAEixqpa5xc-d6BLKjeLcrS6s1Iq3aXRJUMtJf7wg0"
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            exam_id: id,
            exam_name: examName,
            subject: subjectName,
            start_time: startTime,
            duration: duration
        });

        console.log(raw);

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/v1/exam/edit", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));
    };

    const handleDeleteSubmit = async () => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwMDUsImV4cCI6MTY0MDY5ODYzMC41NDA2MDk0fQ.dgAEixqpa5xc-d6BLKjeLcrS6s1Iq3aXRJUMtJf7wg0"
        );

        var raw = "";

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`http://localhost:8080/api/v1/exam/del/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));

        setOpen(false);
    };

    const getData = async () => {
        console.log(id);
        try {
            const res = await axios.get(
                `http://` + process.env.REACT_APP_BACKEND_URL + `exam/get/${id}`,
                {
                    headers: {
                        Authorization:
                            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwMDUsImV4cCI6MTY0MDY5NDM3Mi41OTIyMzUzfQ.WCg4OZM3qc0A7KOmnHBWzRk5QmRK9YRNG6iNu42MlyU"
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
                    <p style={{ color: "red", textDecoration: "underline" }} onClick={handleOpen}>
                        Delete this exam
                    </p>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Delete this axam?
                                </Typography>
                                <button
                                    onClick={handleDeleteSubmit}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </Box>
                        </Fade>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditExam;
