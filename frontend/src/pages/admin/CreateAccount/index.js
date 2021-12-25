import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import styles from "./style.module.css";
import Footer from "../../../components/footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup, Radio } from "react-radio-group";
// import {Redirect} from "react-router-dom";

const CreateAccount = () => {
    // get currentUser from redux store/fetch
    let jwtToken =
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MTY0MDQ1NjMyNC4xMTQzOTkyfQ.2fzKr1V5YutdB9e78LoKurgHDLqfwOMs_iB9usctfVM";
    // const currentUser = {
    //     email: 'test_admin1@mana.itss',
    //     name: 'fluffy_admin_1',
    //     date_of_birth: '20-06-1999',
    //     phone_number: '0123456788',
    //     enable: 'TRUE',
    //     role: 'admin',
    //     jwt_token: 'jwt_token_123456'
    // };
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [accountInfo, setAccountInfo] = useState({
        email: "",
        name: "",
        date_of_birth: "",
        phone_number: "",
        role_id: 1,
        // class: "",
        // major: "",
        password: ""
    });
    useEffect(() => {
        let newHeader = new Headers();
        newHeader.append("Authorization", jwtToken);
        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "account/current", {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setCurrentUser(result);
            })
            .catch(error => console.log("error", error));
        // setCurrentUser({
        //     account_id: 3020,
        //     email: "linhh8@mana.itss",
        //     name: "fluffy_admin",
        //     date_of_birth: "06-06-1999",
        //     phone_number: "0123456788",
        //     role: {
        //         role_id: 2,
        //         name: "examiner"
        //     },
        //     additional_info: null
        // });
    }, []);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [phone, setPhone] = useState("");
    const formatDate = date => {
        // console.log(date)
        const d = new Date(date);
        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        return (
            (day < 10 ? "0" : "") +
            day.toString() +
            "-" +
            (month < 10 ? "0" : "") +
            month.toString() +
            "-" +
            year.toString()
        );
    };
    // const [redirector, setRedirector] = useState(null)
    function handleSubmit() {
        if (accountInfo.email.trim() === "") {
            setError("Email is required");
            return;
        } else if (accountInfo.password.trim() === "") {
            setError("Password is required");
            return;
        } else if (accountInfo.name.trim() === "") {
            setError("Name is required");
            return;
        } else if (accountInfo.date_of_birth.trim() === "") {
            setError("Date of birth is required");
            return;
        }
        // submit to server
        setLoading(true);
        let newHeader = new Headers();
        newHeader.append("Authorization", jwtToken);
        newHeader.append("Content-Type", "application/json");
        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "account/new", {
            method: "POST",
            headers: newHeader,
            body: JSON.stringify(accountInfo),
            redirect: "follow"
        })
            .then(response => {
                setLoading(false);
                setError("Done! You are about to be redirected to home!");
                setTimeout(() => {
                    window.location.href = "/admin/dashboard";
                }, 1500);
                return response.json();
            })
            .then(result => {
                console.log("result");
            })
            .catch(error => {
                setLoading(false);
                setError("Your email is not valid(duplicated or wrong format)!!!");
            });
        // console.log(accountInfo);
        // setRedirector(<Redirect to={"/admin/dashboard"}></Redirect>)
        // window.location.href = "/admin/dashboard";
    }

    return (
        <div>
            <Header />
            <div className={styles.adminPageUpper}>
                <div className={styles.adminPageUpperLeft}>
                    <div style={{ textTransform: "uppercase", fontSize: "24px" }}>
                        Create new account
                    </div>
                </div>
                <div className={styles.adminPageUpperRight}>
                    <div>
                        Welcome back,{" "}
                        <a
                            className="username"
                            href={"/account/editAccount/" + currentUser.account_id}
                        >
                            {currentUser.name}
                        </a>
                    </div>
                </div>
            </div>
            <hr style={{ margin: "0.2rem 0.5rem", height: "1px", backgroundColor: "black" }} />
            <div style={{ height: "1rem" }}></div>
            <div className={styles.createAccountBody}>
                <table id="account_info">
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={data => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            email: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Password"
                                    onChange={data => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            password: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Display name</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Display name"
                                    onChange={data => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            name: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            date_of_birth: formatDate(date)
                                        });
                                        setStartDate(date);
                                    }}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="dd-mm-yyyy"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Phone number</td>
                            <td>
                                <input
                                    type="text"
                                    pattern="[0-9]*"
                                    placeholder="Phone number"
                                    onChange={data => {
                                        let pattern = /^\d+$/;
                                        if (data.target.value.trim() === "") {
                                            setPhone("");
                                            setAccountInfo({
                                                ...accountInfo,
                                                phone_number: ""
                                            });
                                            return;
                                        }
                                        if (pattern.test(data.target.value.trim())) {
                                            setAccountInfo({
                                                ...accountInfo,
                                                phone_number: data.target.value.trim()
                                            });
                                            setPhone(data.target.value.trim());
                                        } else {
                                            data.target.value = phone;
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    width: "100%"
                                }}
                            >
                                <div style={{ paddingTop: "1.5rem" }}>Role</div>
                            </td>
                            <td>
                                <RadioGroup
                                    style={{ display: "flex", flexDirection: "column" }}
                                    name="role"
                                    selectedValue={accountInfo.role_id}
                                    onChange={data => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            role_id: data
                                        });
                                    }}
                                >
                                    <label style={{ color: "#FE3B3B" }}>
                                        <Radio value={1} />
                                        <span style={{ marginLeft: "0.5rem" }}>Admin</span>
                                    </label>
                                    <label style={{ color: "#334257" }}>
                                        <Radio value={3} />
                                        <span style={{ marginLeft: "0.5rem" }}>Examinee</span>
                                    </label>
                                    <label style={{ color: "#CC00FF" }}>
                                        <Radio value={2} />
                                        <span style={{ marginLeft: "0.5rem" }}>Examiner</span>
                                    </label>
                                </RadioGroup>
                            </td>
                        </tr>
                        {/*<tr>*/}
                        {/*    <td>Class</td>*/}
                        {/*    <td>*/}
                        {/*        <input*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Class"*/}
                        {/*            onChange={data => {*/}
                        {/*                setAccountInfo({*/}
                        {/*                    ...accountInfo,*/}
                        {/*                    class: data.target.value.trim()*/}
                        {/*                });*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Major</td>*/}
                        {/*    <td>*/}
                        {/*        <input*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Major"*/}
                        {/*            onChange={data => {*/}
                        {/*                setAccountInfo({*/}
                        {/*                    ...accountInfo,*/}
                        {/*                    major: data.target.value.trim()*/}
                        {/*                });*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                    </tbody>
                </table>
                <div style={{ height: "3rem" }}></div>
                <div className={styles.createAccountBottom}>
                    <div className={styles.createAccountBottomLeft}>
                        <a href={"/admin/dashboard/"}>&lt; Back</a>
                    </div>
                    <div className={styles.createAccountBottomRight}>
                        <div>
                            <button onClick={handleSubmit}>
                                <i className="fa fa-plus"></i>Create This Account
                            </button>
                        </div>
                        <div>{loading ? "Processing..." : error}</div>
                    </div>
                </div>
            </div>
            <Footer />
            {/*{redirector}*/}
        </div>
    );
};

export default CreateAccount;
