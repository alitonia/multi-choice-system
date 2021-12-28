import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/footer/Footer";
import styles from "./ManageExaminees.module.scss";
import { StyledExamSearch, MainViewHeader } from "../Dashboard/MainView.styles";
import axios from "axios";
import { result } from "lodash";
import { useParams } from "react-router";

const ManageExaminees = () => {
    const name = "he";
    const role_id = 1;
    const { id } = useParams();
    const [actionResults, setActionResults] = useState("Nothing to play");
    const [data, setData] = useState();
    const [tableData, setTableData] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [inputSearch, setInputSearch] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwMDUsImV4cCI6MTY0MDY5ODYzMC41NDA2MDk0fQ.dgAEixqpa5xc-d6BLKjeLcrS6s1Iq3aXRJUMtJf7wg0"
        );

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://localhost:8080/api/v1/exam/get_examinees?exam_id=${id} `, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setData(result);
                setTableData(result);
            })
            .catch(error => console.log("error", error));
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
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwMDUsImV4cCI6MTY0MDY5ODYzMC41NDA2MDk0fQ.dgAEixqpa5xc-d6BLKjeLcrS6s1Iq3aXRJUMtJf7wg0"
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            exam_id: id,
            emails: [inputEmail]
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/v1/exam/edit/add_examinees", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));
    };

    const handleDeleteExaminee = (exam_id, examinee_id) => {
        console.log(exam_id, examinee_id);
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwMDUsImV4cCI6MTY0MDY5ODYzMC41NDA2MDk0fQ.dgAEixqpa5xc-d6BLKjeLcrS6s1Iq3aXRJUMtJf7wg0"
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            exam_id: exam_id,
            emails: [examinee_id]
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:8080/api/v1/exam/edit/remove_examinees", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));
    };

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <MainViewHeader>
                    <StyledExamSearch>
                        <div className="title text-heading">YOUR EXAM: </div>
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
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteExaminee(id, value.email)
                                                        }
                                                    >
                                                        Remove
                                                    </button>
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
            </div>

            <Footer />
        </div>
    );
};
export default ManageExaminees;
