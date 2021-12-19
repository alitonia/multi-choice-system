import React, { useState } from "react";
import Header from "../../../components/header/Header";
import styles from "./style.module.css";
import Footer from "../../../components/footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup, Radio } from "react-radio-group";

const CreateAccount = () => {
    const name = "He_admin0000000";
    const [accountInfo, setAccountInfo] = useState({
        email: "",
        name: "",
        dob: "",
        phone_number: "",
        role: { role_id: 2, name: "examinee" },
        class: "",
        major: "",
        password: ""
    });
    const [loading, setLoading] = useState(false)
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

    function handleSubmit() {
        // submit to server
        setLoading(true)
        console.log(accountInfo)
    };

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
                        <a className="username" href="/settings">
                            {name}
                        </a>
                    </div>
                </div>
            </div>
            <hr style={{ margin: "0.2rem 0.5rem" }} />
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
                                            dob: formatDate(date)
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
                            <td  style={{display: "flex", flexDirection:"row", justifyContent: "flex-end", width: "100%"}}><div style={{paddingTop: "1.5rem"}}>Role</div></td>
                            <td>
                                <RadioGroup
                                    style={{display: "flex", flexDirection:"column"}}
                                    name="role"
                                    selectedValue={accountInfo.role.name}
                                    onChange={data => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            role: {
                                                name: data,
                                                role_id:
                                                    data === "admin"
                                                        ? 0
                                                        : data === "examinee"
                                                        ? 2
                                                        : 1
                                            }
                                        });
                                    }}
                                >
                                    <label style={{color: "#FE3B3B"}}>
                                        <Radio value="admin" />
                                        <span style={{marginLeft: "0.5rem"}}>Admin</span>
                                    </label>
                                    <label style={{color: "#334257"}}>
                                        <Radio value="examinee" />
                                        <span style={{marginLeft: "0.5rem"}}>Examinee</span>
                                    </label>
                                    <label style={{color: "#CC00FF"}}>
                                        <Radio value="examiner" />
                                        <span style={{marginLeft: "0.5rem"}}>Examiner</span>
                                    </label>
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Class"
                                    onChange={data => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            class: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Major</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Major"
                                    onChange={data => {
                                        setAccountInfo({
                                            ...accountInfo,
                                            major: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ height: "3rem" }}></div>
                <div className={styles.createAccountBottom}>
                    <div className={styles.createAccountBottomLeft}>
                        <a href={"/admin/dashboard/"}>
                            &lt; Back
                        </a>
                    </div>
                    <div className={styles.createAccountBottomRight}>
                        <div>
                            <button onClick={handleSubmit}>
                                <i className="fa fa-plus"></i>Create This Account
                            </button>
                        </div>
                        <div>
                            {loading?"Processing...":""}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CreateAccount;
