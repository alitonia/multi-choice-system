import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import styles from "./style.module.css";
import { Redirect, useParams } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import DatePicker from "react-datepicker";
import { Radio, RadioGroup } from "react-radio-group";
import {isEqual} from "lodash";

const EditAccount = () => {
    const { id } = useParams();
    // get currentUser from redux store/fetch
    const currentUser = {
        id: 13,
        email: "test_admin1@mana.itss",
        name: "fluffy_admin_1",
        date_of_birth: "20-06-1999",
        phone_number: "0123456788",
        enable: "TRUE",
        role: "admin",
        jwt_token: "jwt_token_123456"
    };
    const defaultInfo = {
        email: "",
        name: "",
        date_of_birth: "",
        phone_number: "",
        role: {},
        class: "",
        major: "",
        password: ""
    };
    const [editInfo, setEditInfo] = useState({
        email: "",
        name: "",
        date_of_birth: "",
        phone_number: "",
        role: {},
        class: "",
        major: "",
        password: ""
    });
    const [editAccount, setEditAccount] = useState({
        email: "",
        name: "",
        date_of_birth: "",
        phone_number: "",
        role: {},
        class: "",
        major: "",
        password: "**********"
    });
    useEffect(() => {
        // fetch user with id in route param
        if (currentUser.role === "admin" || currentUser.id === parseInt(id)) {
            setEditAccount({
                ...editAccount,
                email: "test_admin1@mana.itss",
                name: "fluffy_admin_1",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 2, name: "examinee" }
            });
            // setEditInfo({
            //     ...editInfo,
            //     role: { role_id: 2, name: "examinee" }
            // });
        }
    }, []);
    const [startDate, setStartDate] = useState("");
    const [phone, setPhone] = useState("");
    const formatDate = date => {
        if(date===null) return "";
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

    function deleteAccount() {
        console.log("delete account " + id)
    }

    function saveChange() {
        if(isEqual(defaultInfo, editInfo))
        console.log("edit account" + JSON.stringify(editInfo))
        // loading --> doi text You have unsaved changes
        // sau day thi redirect ve home
    }

    return (
        <div>
            <Header />
            {currentUser.role !== "admin" && currentUser.id !== parseInt(id) && (
                <Redirect to={"/account/editAccount/" + currentUser.id.toString()} />
            )}
            <div className={styles.adminPageUpper}>
                <div className={styles.adminPageUpperLeft}>
                    <div style={{ textTransform: "uppercase", fontSize: "24px" }}>Edit account</div>
                </div>
                <div className={styles.adminPageUpperRight}>
                    <div>
                        Welcome back,{" "}
                        <a className="username" href="/settings">
                            {currentUser.name}
                        </a>
                    </div>
                    <div style={{ display: currentUser.role === "admin" ? "" : "none" }}>
                        <a href={"/admin/createAccount/"}>
                            <button>
                                <i className="fa fa-plus"></i>Create New Account...
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <hr style={{ margin: "0.2rem 0.5rem", height: "1px", backgroundColor: "black" }} />
            <div style={{ height: "1rem" }}></div>
            <div className={styles.editAccountBody}>
                <table id={"account_info"}>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{editAccount.email}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Change email..."
                                    onChange={data => {
                                        setEditInfo({
                                            ...editInfo,
                                            email: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>{editAccount.password}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Change password..."
                                    onChange={data => {
                                        setEditInfo({
                                            ...editInfo,
                                            password: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Display name</td>
                            <td>{editAccount.name}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Change display name..."
                                    onChange={data => {
                                        setEditInfo({
                                            ...editInfo,
                                            name: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>{editAccount.date_of_birth}</td>
                            <td>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => {
                                        setEditInfo({
                                            ...editInfo,
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
                            <td>{editAccount.phone_number}</td>
                            <td>
                                <input
                                    type="text"
                                    pattern="[0-9]*"
                                    placeholder="Change phone number..."
                                    onChange={data => {
                                        let pattern = /^\d+$/;
                                        if (data.target.value.trim() === "") {
                                            setPhone("");
                                            setEditInfo({
                                                ...editInfo,
                                                phone_number: ""
                                            });
                                            return;
                                        }
                                        if (pattern.test(data.target.value.trim())) {
                                            setEditInfo({
                                                ...editInfo,
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
                                    justifyContent: "flex-end"
                                }}
                            >
                                <div>Role</div>
                            </td>
                            <td
                                style={{
                                    textTransform: "capitalize",
                                    color:
                                        editAccount.role.name === "admin"
                                            ? "#FE3B3B"
                                            : editAccount.role.name === "examinee"
                                            ? "#334257"
                                            : "#CC00FF\n"
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        height: "100%",
                                        width: "100%",
                                        position: "relative",
                                    }}
                                >
                                    {editAccount.role.name}
                                </div>
                            </td>
                            <td>
                                <RadioGroup
                                    style={{ display: "flex", flexDirection: "column" }}
                                    name="role"
                                    selectedValue={editInfo.role.name}
                                    onChange={data => {
                                        setEditInfo({
                                            ...editInfo,
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
                                    <label style={{ color: "#FE3B3B" }}>
                                        <Radio
                                            value="admin"
                                            disabled={currentUser.role !== "admin"}
                                        />
                                        <span style={{ marginLeft: "0.5rem" }}>Admin</span>
                                    </label>
                                    <label style={{ color: "#334257" }}>
                                        <Radio
                                            value="examinee"
                                            disabled={currentUser.role !== "admin"}
                                        />
                                        <span style={{ marginLeft: "0.5rem" }}>Examinee</span>
                                    </label>
                                    <label style={{ color: "#CC00FF" }}>
                                        <Radio
                                            value="examiner"
                                            disabled={currentUser.role !== "admin"}
                                        />
                                        <span style={{ marginLeft: "0.5rem" }}>Examiner</span>
                                    </label>
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>
                                {editAccount.class.trim() === ""
                                    ? "None"
                                    : editAccount.class.trim()}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Change class..."
                                    onChange={data => {
                                        setEditInfo({
                                            ...editInfo,
                                            class: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Major</td>
                            <td>
                                {editAccount.major.trim() === ""
                                    ? "None"
                                    : editAccount.major.trim()}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Change major..."
                                    onChange={data => {
                                        setEditInfo({
                                            ...editInfo,
                                            major: data.target.value.trim()
                                        });
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className={styles.editAccountBottom}>
                                    <div className={styles.editAccountBottomLeft}>
                                        <a href={"/home"}>
                                            &lt; Back
                                        </a>
                                    </div>
                                    <div className={styles.editAccountBottomRight}>
                                        <div>
                                            <button onClick={saveChange}>
                                                Save Changes
                                            </button>
                                        </div>
                                        <div style={{marginLeft: "5rem"}}>
                                            {isEqual(defaultInfo, editInfo)?"":"You have unsaved changes"}
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop: "1.5rem", display: currentUser.role === "admin" ? "" : "none"}} >
                                    or
                                </div>
                                <div style={{ display: currentUser.role === "admin" ? "" : "none" }}>
                                    <button onClick={deleteAccount} className={styles.deleteButton}>Delete this account
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default EditAccount;
