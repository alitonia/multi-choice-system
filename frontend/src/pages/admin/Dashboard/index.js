import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import styles from "./style.module.css";
import Footer from "../../../components/footer/Footer";

const AdminDashboard = () => {
    // get currentUser from redux store/fetch
    const currentUser = {
        email: 'test_admin1@mana.itss',
        name: 'fluffy_admin_1',
        date_of_birth: '20-06-1999',
        phone_number: '0123456788',
        enable: 'TRUE',
        role: 'admin',
        jwt_token: 'jwt_token_123456'
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        setData([
            {
                email: "test_admin1@mana.itss",
                name: "fluffy_admin_1",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 2, name: "examinee" }
            },
            {
                email: "test_admin2@mana.itss",
                name: "fluffy_admin_2",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 1, name: "examiner" }
            },
            {
                email: "test_admin3@mana.itss",
                name: "fluffy_admin_3",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "FALSE",
                role: { role_id: 2, name: "examinee" }
            },
            {
                email: "test_admin4@mana.itss",
                name: "fluffy_admin_4",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 1, name: "examinee" }
            },
            {
                email: "test_admin5@mana.itss",
                name: "fluffy_admin_5",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 2, name: "examinee" }
            },
            {
                email: "test_admin6@mana.itss",
                name: "fluffy_admin_6",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "FALSE",
                role: { role_id: 1, name: "examinee" }
            },
            {
                email: "test_admin7@mana.itss",
                name: "fluffy_admin_7",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 2, name: "examinee" }
            },
            {
                email: "test_admin8@mana.itss",
                name: "fluffy_admin_8",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 1, name: "examinee" }
            },
            {
                email: "test_admin9@mana.itss",
                name: "fluffy_admin_9",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "FALSE",
                role: { role_id: 2, name: "examinee" }
            },
            {
                email: "test_admin10@mana.itss",
                name: "fluffy_admin_10",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 1, name: "examinee" }
            },
            {
                email: "test_admin11@mana.itss",
                name: "fluffy_admin_11",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 2, name: "examinee" }
            },
            {
                email: "test_admin12@mana.itss",
                name: "fluffy_admin_12",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "FALSE",
                role: { role_id: 1, name: "examinee" }
            },
            {
                email: "test_admin13@mana.itss",
                name: "fluffy_admin_13",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 2, name: "examinee" }
            },
            {
                email: "test_admin14@mana.itss",
                name: "fluffy_admin_14",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "TRUE",
                role: { role_id: 1, name: "examinee" }
            },
            {
                email: "test_admin15@mana.itss",
                name: "fluffy_admin_15",
                date_of_birth: "20-06-1999",
                phone_number: "0123456788",
                enable: "FALSE",
                role: { role_id: 2, name: "examinee" }
            }
        ]);
    }, []);
    const [keyword, setKeyword] = useState("");
    const submitSearch = event => {
        let currentKeyword = document.getElementById("searchInput").value;
        //fetch new list, then setData
        // if (currentKeyword.trim() === "") {
        //     console.log("empty search");
        // } else
        if (currentKeyword.trim() !== keyword) {
            setKeyword(currentKeyword.trim());
            console.log("search with keyword " + currentKeyword.trim());
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
                                placeholder="Search for an account..."
                                id="searchInput"
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className={styles.adminPageUpperRight}>
                    <div>
                        Welcome back,{" "}
                        <a className="username" href="/settings">
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
            <hr style={{ margin: "0.2rem 0.5rem",  height: "1px", backgroundColor: "black"  }} />
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
                                    <a href={"/admin/editAccount/" + index}>
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
