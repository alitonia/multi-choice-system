import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import styles from "./style.module.css";
import Footer from "../../../components/footer/Footer";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const accountPerPage = 15;

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const AdminDashboard = () => {
    const query = useQuery()
    const currentPage = parseInt(query.get("page")) || 1
    const keyWord = query.get("search") || ""
    const [totalPage, setTotalPage] = useState(1)

    const [totalAccount, setTotalAccount] = useState(1)
    // get currentUser from redux store/fetch
    let jwtToken = "Bearer " + localStorage.getItem("access_token");
    // "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImV4cCI6MTY0MDQ1NjMyNC4xMTQzOTkyfQ.2fzKr1V5YutdB9e78LoKurgHDLqfwOMs_iB9usctfVM";
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
        console.log("current page, keyword"+currentPage.toString()+keyWord)
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

        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "accounts/total"+"?email="+keyWord, {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setTotalAccount(result.total);
                setTotalPage(Math.floor(result.total/accountPerPage)+1)
                console.log(totalAccount)
                const skip = (result.total+1-currentPage*accountPerPage)<0?0:result.total+1-currentPage*accountPerPage
                fetch("http://" + process.env.REACT_APP_BACKEND_URL + "accounts?limit="+accountPerPage.toString()+"&skip="+skip.toString()+"&email="+keyWord, {
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
            })
            .catch(error => console.log("error", error));
    }, []);
    const [keyword, setKeyword] = useState(keyWord);
    const submitSearch = event => {
        console.log(keyword, keyWord)
        if(keyword===keyWord) {
            console.log("old search")
        }else{
            window.location.href="http://" + process.env.REACT_APP_FRONTEND_URL+"/admin/dashboard?page=1&search="+keyword;
        }
        event.preventDefault()
        // let currentKeyword = document.getElementById("searchInput").value;
        // if (currentKeyword.trim() !== keyword) {
        //     setData([]);
        //     setLoading(true);
            // setKeyword(currentKeyword.trim());
            // console.log("search with keyword " + currentKeyword.trim());

            // let newHeader = new Headers();
            // newHeader.append("Authorization", jwtToken);
            // if (currentKeyword.trim() === "") {
        // if(keyWord)
                // fetch("http://" + process.env.REACT_APP_BACKEND_URL + "accounts/total", {
                //     method: "GET",
                //     headers: newHeader,
                //     redirect: "follow"
                // })
                //     .then(response => response.json())
                //     .then(result => {
                //         setTotalAccount(result.total);
                //         fetch("http://" + process.env.REACT_APP_BACKEND_URL + "accounts?limit="+accountPerPage.toString(), {
                //             method: "GET",
                //             headers: newHeader,
                //             redirect: "follow"
                //         })
                //             .then(response => response.json())
                //             .then(result => {
                //                 setLoading(false);
                //                 setData(result);
                //             })
                //             .catch(error => console.log("error", error));
                //     })
                //     .catch(error => console.log("error", error));
            //     window.location.href="/admin/dashboard?page=1"
            //     return
            // } else {
            //     fetch("http://" + process.env.REACT_APP_BACKEND_URL + "accounts/total"+"?email=" +
            //         currentKeyword.trim(), {
            //         method: "GET",
            //         headers: newHeader,
            //         redirect: "follow"
            //     })
            //         .then(response => response.json())
            //         .then(result => {
            //             setTotalAccount(result.total);
            //             fetch(
            //                 "http://" +
            //                 process.env.REACT_APP_BACKEND_URL +
            //                 "accounts?limit="+accountPerPage.toString()+"&email=" +
            //                 currentKeyword.trim(),
            //                 {
            //                     method: "GET",
            //                     headers: newHeader,
            //                     redirect: "follow"
            //                 }
            //             )
            //                 .then(response => response.json())
            //                 .then(result => {
            //                     setLoading(false);
            //                     setData(result);
            //                 })
            //                 .catch(error => console.log("error", error));
            //         })
            //         .catch(error => console.log("error", error));
            // }
        // } else {
        //     console.log("old search");
        // }
        // event.preventDefault();
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
                                value={keyword}
                                onChange={e=>setKeyword(e.target.value)}
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className={styles.adminPageUpperRight}>
                    <div>
                        Welcome back,{" "}
                        <a className="username" href={"/account/edit/" + currentUser.account_id}>
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
                        {data
                            .slice(0)
                            .reverse()
                            .map((item, index) => (
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
                                        <a href={"/account/edit/" + item.account_id.toString()}>
                                            <button>Edit</button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <Pagination currentPage={currentPage} totalPage={totalPage} search={keyWord}/>
            </div>
            <Footer />
        </div>
    );
};

const Pagination = ({currentPage, totalPage, search}) => {
    const cP = currentPage > totalPage?totalPage : currentPage
    const tmp = new Array(totalPage)
    const moveToPage = (pageIndex, search) => {
        window.location.href="http://" + process.env.REACT_APP_FRONTEND_URL+"/admin/dashboard?page="+pageIndex.toString()+"&search="+search;
    }
    tmp.fill("")
    if(totalPage < 5)
        return (
            <div>
                {tmp.map((item, index) =>
                    (<button key={index} onClick={()=>moveToPage(index, search)}>{index+1}</button>)
                )}
            </div>
        )
    else {
        if(cP === 1 || cP === 2){
            return (
                <div>
                    <button onClick={()=>moveToPage(1, search)}>1</button>
                    <button onClick={()=>moveToPage(2, search)}>2</button>
                    <button onClick={()=>moveToPage(3, search)}>...</button>
                    <button onClick={()=>moveToPage(totalPage, search)}>{totalPage}</button>
                </div>
            )
        }
        else if (cP === totalPage || cP ===totalPage-1){
            return (
                <div>
                    <button onClick={()=>moveToPage(1, search)}>1</button>
                    <button onClick={()=>moveToPage(totalPage-2, search)}>...</button>
                    <button onClick={()=>moveToPage(totalPage-1, search)}>{totalPage-1}</button>
                    <button onClick={()=>moveToPage(totalPage, search)}>{totalPage}</button>
                </div>
            )
        }
        else {
            return  (
                <div>
                    <button onClick={()=>moveToPage(1, search)}>1</button>
                    <button onClick={()=>moveToPage(cP-1, search)}>...</button>
                    <button onClick={()=>moveToPage(cP, search)}>{cP}</button>
                    <button onClick={()=>moveToPage(cP+1, search)}>...</button>
                    <button onClick={()=>moveToPage(totalPage, search)}>{totalPage}</button>
                </div>
            )
        }
    }
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPage: PropTypes.number,
    search: PropTypes.string
}

export default AdminDashboard;
