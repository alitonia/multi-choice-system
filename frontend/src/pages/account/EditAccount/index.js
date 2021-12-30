import React, {useEffect, useState} from "react";
import Header from "../../../components/header/Header";
import styles from "./style.module.css";
import {Redirect, useParams} from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import DatePicker from "react-datepicker";
import {Radio, RadioGroup} from "react-radio-group";
import {isEqual} from "lodash";

const EditAccount = () => {
    const {id} = useParams();
    // get currentUser from redux store/fetch
    let jwtToken = "Bearer " + localStorage.getItem("access_token");

    const [currentUser, setCurrentUser] = useState({});
    const defaultInfo = {
        name: "",
        date_of_birth: "",
        phone_number: ""
    };
    const [editInfo, setEditInfo] = useState({
        name: "",
        date_of_birth: "",
        phone_number: ""
    });
    const [editAccount, setEditAccount] = useState({});
    const [loadCurrentAccount, setLoadCurrentAccount] = useState(true);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState("");

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
        // fetch user with id in route param

        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "account/" + id, {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setLoadCurrentAccount(false);
                setEditAccount(result);
            })
            .catch(error => console.log("error", error));
        // }
    }, []);
    const [startDate, setStartDate] = useState("");
    const [phone, setPhone] = useState("");
    const formatDate = date => {
        if (date === null) return "";
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


    function saveChange() {
        if (!isEqual(defaultInfo, editInfo)) {
            setLoad(true);
            let newHeader = new Headers();
            newHeader.append("Authorization", jwtToken);
            newHeader.append("Content-Type", "application/json");
            const dataToServer = {
                id: id,
                name: editInfo.name.trim() === "" ? editAccount.name : editInfo.name.trim(),
                date_of_birth:
                    editInfo.date_of_birth.trim() === ""
                        ? editAccount.date_of_birth
                        : editInfo.date_of_birth.trim(),
                phone_number:
                    editInfo.phone_number.trim() === ""
                        ? editAccount.phone_number
                        : editInfo.phone_number.trim()
            };
            fetch("http://" + process.env.REACT_APP_BACKEND_URL + "account/edit", {
                method: "PUT",
                headers: newHeader,
                body: JSON.stringify(dataToServer),
                redirect: "follow"
            })
                .then(response => {
                    setEditInfo(defaultInfo);
                    setLoad(false);
                    setError(
                        "Done! This page is about to be refreshed so you can see the updated info."
                    );
                    setTimeout(() => {
                        document.location.reload(true);
                    }, 1000);
                    return response.json();
                })
                .then(result => {
                    console.log("result");
                })
                .catch(error => {
                    setLoad(false);
                    setError("Something is wrong with our server!!!");
                });
        } else {
            setError("You haven't change anything!");
        }
        // loading --> doi text You have unsaved changes
        // sau day thi redirect ve home
    }

    return (
        <div>
            <Header/>
            <div className={styles.adminPageUpper}>
                <div className={styles.adminPageUpperLeft}>
                    <div style={{textTransform: "uppercase", fontSize: "24px"}}>Edit account</div>
                </div>
                <div className={styles.adminPageUpperRight}>
                    <div>
                        Welcome back,{" "}
                        <a className="username" href="/">
                            {currentUser.name}
                        </a>
                    </div>
                    <div style={{display: currentUser.role === "admin" ? "" : "none"}}>
                        <a href={"/admin/createAccount/"}>
                            <button>
                                <i className="fa fa-plus"></i>Create New Account...
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <hr style={{margin: "0.2rem 0.5rem", height: "1px", backgroundColor: "black"}}/>
            <div style={{height: "1rem"}}></div>
            <div className={styles.editAccountBody}>
                <table id={"account_info"}>
                    <tbody>
                    <tr>
                        <td>Email</td>
                        <td>{loadCurrentAccount ? "Loading..." : editAccount.email}</td>
                        <td>
                            Email cannot be changed!
                        </td>
                    </tr>
                    <tr>
                        <td>Display name</td>
                        <td>{loadCurrentAccount ? "Loading..." : editAccount.name}</td>
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
                                className={'base-wide-input'}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Date of birth</td>
                        <td>{loadCurrentAccount ? "Loading..." : editAccount.date_of_birth}</td>
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
                                className={'base-wide-input'}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Phone number</td>
                        <td>{loadCurrentAccount ? "Loading..." : editAccount.phone_number}</td>
                        <td>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                placeholder="Change phone number..."
                                className={'base-wide-input'}
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
                                    typeof editAccount.role !== "undefined" &&
                                    editAccount.role.name === "admin"
                                        ? "#FE3B3B"
                                        : typeof editAccount.role !== "undefined" &&
                                        editAccount.role.name === "examinee"
                                            ? "#334257"
                                            : typeof editAccount.role !== "undefined"
                                                ? "#CC00FF"
                                                : ""
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    height: "100%",
                                    width: "100%",
                                    position: "relative"
                                }}
                            >
                                {typeof editAccount.role === "undefined"
                                    ? "Loading..."
                                    : editAccount.role.name}
                            </div>
                        </td>
                        <td>
                            <RadioGroup
                                style={{display: "flex", flexDirection: "column", lineHeight: 'unset'}}
                                name="role"
                                selectedValue={
                                    typeof editAccount.role === "undefined"
                                        ? ""
                                        : editAccount.role.name
                                }
                            >
                                <label style={{color: "lightgrey"}}>
                                    <Radio value="admin" disabled={true}/>
                                    <span style={{marginLeft: "0.5rem"}}>Admin</span>
                                </label>
                                <label style={{color: "lightgrey"}}>
                                    <Radio value="examinee" disabled={true}/>
                                    <span style={{marginLeft: "0.5rem"}}>Examinee</span>
                                </label>
                                <label style={{color: "lightgrey"}}>
                                    <Radio value="examiner" disabled={true}/>
                                    <span style={{marginLeft: "0.5rem"}}>Examiner</span>
                                </label>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className={styles.editAccountBottom}>
                                <div className={styles.editAccountBottomLeft}>
                                    <a
                                        href={
                                            typeof currentUser.role !== "undefined" &&
                                            currentUser.role.name === "admin"
                                                ? "/admin/dashboard"
                                                : "/dashboard"
                                        }
                                    >
                                        &lt; Back
                                    </a>
                                </div>
                                <div className={styles.editAccountBottomRight}>
                                    <div>
                                        <button onClick={saveChange} className={'real-button'}>Save Changes</button>
                                    </div>
                                    <div style={{marginLeft: "5rem"}}>
                                        {isEqual(defaultInfo, editInfo)
                                            ? ""
                                            : "You have unsaved changes"}
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: "1.5rem"}}>
                                {load
                                    ? "Processing..."
                                    : isEqual(defaultInfo, editInfo)
                                        ? error
                                        : ""}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    );
};

export default EditAccount;
