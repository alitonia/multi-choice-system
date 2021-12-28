import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/footer/Footer";
import styles from "./ManageExaminees.module.scss";
import { StyledExamSearch, MainViewHeader } from "../Dashboard/MainView.styles";
import axios from "axios";

const ManageExaminees = () => {
    const name = "he";
    const role_id = 1;
    const [actionResults, setActionResults] = useState("Nothing to play");
    const [data, setData] = useState();
    const [tableData, setTableData] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [inputSearch, setInputSearch] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(
                "http://" + process.env.REACT_APP_BACKEND_URL + "exam/get_examinees?exam_id=4",
                {
                    headers: {
                        Authorization:
                            "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ5OTcsImV4cCI6MTY0MDY3ODcwNS43MzEwNDYyfQ.8QhQgE8wX47L2GUWK_Sg2p85uYwBDXqZZexxO_I6_gY"
                    }
                }
            );
            console.log(res.status);
            if (res.status === 200) {
                console.log(res.data);
                setData(res.data);
                setTableData(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeInput = event => {
        setInputEmail(event.target.value);
    };

    const handleChangeSearch = event => {
        setInputSearch(event.target.value);
    };

    const handleClickSearch = () => {
        const searchResult = [];
        if (inputSearch) {
            console.log(inputSearch);
            data.map((value, index) => {
                console.log(value.email);
                if (value.email.includes(inputSearch)) {
                    searchResult.push(data[index]);
                }
            });
            setTableData(searchResult);
        } else {
            setTableData(data);
        }
    };

    const handleClickAdd = () => {
        console.log(inputEmail);
        const newExaminee = {
            exam_id: 4,
            examinee_ids: 123
        };
    };

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
                                onChange={handleChangeSearch}
                            />
                            <button className="text-base" onClick={handleClickSearch}>
                                Search
                            </button>
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
                                    {tableData?.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{value.email}</td>
                                                <td>{value.name}</td>
                                            </tr>
                                        );
                                    })}
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
                                    {tableData?.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{value.date_of_birth}</td>
                                                <td>{value.phone_number}</td>
                                                <td>ICT01 - K63</td>
                                                <td>ICT</td>
                                                <td>
                                                    <button>Remove</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
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
                            onChange={handleChangeInput}
                        ></input>
                        <button className={styles.addButton} onClick={handleClickAdd}>
                            Add examinee
                        </button>
                        <p>Your student will be sent a notification email</p>
                    </Grid>
                    <Grid item xs={8}>
                        <div className={styles.ManageHeader}>ACTION RESULTS</div>
                        <p>{actionResults}</p>
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
