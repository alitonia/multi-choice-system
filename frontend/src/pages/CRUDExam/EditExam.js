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
import { useHistory } from "react-router-dom";

const EditExam = () => {
    const { id } = useParams();
    const [examData, setExamData] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const history = useHistory();

    // const startDate = examData? (new Date(Date.parse(examData.start_time))):null
    // const sepDuration = examData
    //     ?examData.duration.split(':')
    //     :Array(3).map(()=>0)
    //
    // const miliDuration = (( sepDuration[0]*60+ sepDuration[1])*60 +sepDuration[2])*1000
    //
    // const endTime = startDate?new Date(startDate+miliDuration) : null

    const examFinished = examData ? true: false

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
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            exam_id: id,
            exam_name: examName,
            subject: subjectName,
            start_time: startTime,
            duration: duration.length == 5 ? duration : duration.substring(0, duration.length - 3)
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
            .then(() => history.push("/dashboard"))
            .catch(error => console.log("error", error));
    };

    const handleDeleteSubmit = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

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
            .then(() => history.replace("/dashboard"))
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
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
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
                <CRUDHeader headerType="EDIT" />
                <CRUDTable data={examData} handleSubmit={handleEditSubmit} />

                {examFinished && (
                    <h3><a href={`/examiner/examStatistic/${id}`}>Statistic</a></h3>
                )}


                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <div className={styles.CRUDHeader}>EXAMINEES</div>
                        <button
                            className={styles.editButton}
                            onClick={() => history.push(`/manageExaminees/${id}`)}
                        >
                            Edit Examinees
                        </button>
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
