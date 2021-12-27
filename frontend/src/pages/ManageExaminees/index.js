import React from "react";
import Header from "../../components/header/Header";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/footer/Footer";
import styles from "./ManageExaminees.module.scss";
import { StyledExamSearch, MainViewHeader } from "../Dashboard/MainView.styles";

const ManageExaminees = () => {
    const name = "he";
    const role_id = 1;
    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <MainViewHeader>
                    <StyledExamSearch>
                        <div className="title text-heading">YOUR EXAMS</div>
                        <div className="input-wrapper">
                            <input
                                className="text-base"
                                type="text"
                                placeholder="Search for an examinees..."
                            />
                            <button className="text-base">Search</button>
                        </div>
                    </StyledExamSearch>
                    <div className="user-welcome text-large">
                        <span>Welcome back, {name}</span>
                    </div>
                </MainViewHeader>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <div className={styles.tableWrapper}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Email</td>
                                        <td>Display name</td>
                                    </tr>
                                    <tr>
                                        <td>he@sis.hust.edu.vn</td>
                                        <td>He_student00</td>
                                    </tr>
                                    <tr>
                                        <td>he@sis.hust.edu.vn</td>
                                        <td>He_student00</td>
                                    </tr>
                                    <tr>
                                        <td>he@sis.hust.edu.vn</td>
                                        <td>He_student00</td>
                                    </tr>
                                    <tr>
                                        <td>he@sis.hust.edu.vn</td>
                                        <td>He_student00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className={styles.tableWrapper}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Date of birth</td>
                                        <td>Phone number</td>
                                        <td>Class</td>
                                        <td>Major</td>
                                        <td>Action</td>
                                    </tr>
                                    <tr>
                                        <td>04/10/2000</td>
                                        <td>0987654321</td>
                                        <td>ICT01 - K63</td>
                                        <td>ICT</td>
                                        <td>
                                            <button>Remove</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>04/10/2000</td>
                                        <td>0987654321</td>
                                        <td>ICT01 - K63</td>
                                        <td>ICT</td>
                                        <td>
                                            <button>Remove</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>04/10/2000</td>
                                        <td>0987654321</td>
                                        <td>ICT01 - K63</td>
                                        <td>ICT</td>
                                        <td>
                                            <button>Remove</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>04/10/2000</td>
                                        <td>0987654321</td>
                                        <td>ICT01 - K63</td>
                                        <td>ICT</td>
                                        <td>
                                            <button>Remove</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={styles.ManageHeader}>ADD EXAMINEE</div>
                        <input
                            type="text"
                            placeholder="Enter new examinee's email ..."
                            className={styles.inputField}
                        ></input>
                        <button className={styles.addButton}>Add examinee</button>
                        <p>Your student will be sent a notification email</p>
                    </Grid>
                    <Grid item xs={8}>
                        <div className={styles.ManageHeader}>ACTION RESULTS</div>
                        <p>Nothing to play</p>
                    </Grid>
                </Grid>
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
export default ManageExaminees;
