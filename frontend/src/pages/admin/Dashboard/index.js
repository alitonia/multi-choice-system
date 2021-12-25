import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import styles from "./style.module.css";
import Footer from "../../../components/footer/Footer";

const AdminDashboard = () => {
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
    const [currentUser, setCurrentUser] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // axios
        //     .get(process.env.REACT_APP_BACKEND_URL + "account/current", {
        //         headers: {
        //             Authorization: jwtToken
        //         }
        //     })
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
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

        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "accounts?limit=5000", {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                setData(result);
            })
            .catch(error => console.log("error", error));
    }, []);
    const [keyword, setKeyword] = useState("");
    const submitSearch = event => {
        let currentKeyword = document.getElementById("searchInput").value;
        if (currentKeyword.trim() !== keyword) {
            setData([]);
            setLoading(true);
            setKeyword(currentKeyword.trim());
            console.log("search with keyword " + currentKeyword.trim());
            let newHeader = new Headers();
            newHeader.append("Authorization", jwtToken);
            if (currentKeyword.trim() === "") {
                fetch("http://" + process.env.REACT_APP_BACKEND_URL + "accounts?limit=5000", {
                    method: "GET",
                    headers: newHeader,
                    redirect: "follow"
                })
                    .then(response => response.json())
                    .then(result => {
                        setLoading(false);
                        setData(result);
                    })
                    .catch(error => console.log("error", error));
            } else {
                fetch(
                    "http://" +
                        process.env.REACT_APP_BACKEND_URL +
                        "accounts?limit=5000&email=" +
                        currentKeyword.trim(),
                    {
                        method: "GET",
                        headers: newHeader,
                        redirect: "follow"
                    }
                )
                    .then(response => response.json())
                    .then(result => {
                        setLoading(false);
                        setData(result);
                    })
                    .catch(error => console.log("error", error));
            }
        } else {
            console.log("old search");
        }
        event.preventDefault();
    };
    return (
        <div>
            <Header />
            <div className={styles.adminPageUpper}>
                <div className={styles.adminPageUpperLeft}>
                    <div style={{ textTransform: "uppercase", fontSize: "24px" }}>Account</div>
                    <div>
                        <form onSubmit={submitSearch}>
                            <input
                                type="text"
                                placeholder="Search for an account by email..."
                                id="searchInput"
                            />
                            <button type="submit">Search</button>
                        </form>
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
                    <div>
                        <a href={"/admin/createAccount/"}>
                            <button>
                                <i className="fa fa-plus"></i>Create New Account...
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <hr style={{ margin: "0.2rem 0.5rem", height: "1px", backgroundColor: "black" }} />
            <div style={{ height: "3rem" }}></div>
            <div className={styles.adminPageLower}>
                <div>For more details on each account, click Edit</div>
                <table id={"account"}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Display name</th>
                            <th>Date of birth</th>
                            <th>Phone number</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 || loading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    style={{ textAlign: "center" }}
                                    className={styles.customTd}
                                >
                                    {loading ? "Loading" : "No record"}
                                </td>
                            </tr>
                        ) : null}
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.date_of_birth}</td>
                                <td>{item.phone_number}</td>
                                <td
                                    style={{
                                        textTransform: "capitalize",
                                        color:
                                            item.role.name === "admin"
                                                ? "#FE3B3B"
                                                : item.role.name === "examinee"
                                                ? "#334257"
                                                : "#CC00FF"
                                    }}
                                >
                                    {item.role.name}
                                </td>
                                <td>
                                    <a href={"/account/editAccount/" + item.account_id.toString()}>
                                        <button>Edit</button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
