/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./QuestionPage.css";
import { useState, useEffect } from "react";
import he from "he";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";

const questionsPerPage = 30;
const questionsPerRow = 5;

const QuestionPage = (
    {
        // questionAPI = "https://opentdb.com/api.php?amount=50",
    }
) => {
    //   const [pageNumber, setPageNumber] = useState(0);
    const [questionInfo, setQuestionInfo] = useState(null);
    let jwtToken = "Bearer " + localStorage.getItem("access_token");
    // const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { id } = useParams();

    const updateChoice = (question_id, answer_id) => {
        // using current user token as well
        // send update choice to server
        // console.log("Choose: quesion_id " + question_id.toString() + " anwser_id " + answer_id.toString())
        // update setQuestionInfo
        for (let item in questionInfo.questions) {
            if (questionInfo.questions[item].question_id === question_id) {
                if (questionInfo.questions[item].question_type_id === 1) {
                    questionInfo.questions[item].choices = [answer_id];
                } else {
                    if (questionInfo.questions[item].choices === null) {
                        questionInfo.questions[item].choices = [answer_id];
                    } else {
                        questionInfo.questions[item].choices.push(answer_id);
                    }
                }
            }
        }
        const newQuestion = Array.from(questionInfo.questions);
        setQuestionInfo({ ...questionInfo, questions: newQuestion });
    };

    const updateUnchoose = (question_id, answer_id) => {
        // using current user token as well
        // send unchoice to server
        // console.log("Unchoose: quesion_id " + question_id.toString() + " anwser_id " + answer_id.toString())
        // update setQuestionInfo
        for (let item in questionInfo.questions) {
            if (questionInfo.questions[item].question_id === question_id) {
                if (questionInfo.questions[item].question_type_id === 1) {
                    questionInfo.questions[item].choices = [];
                } else {
                    // remove specific item from array
                    const index = questionInfo.questions[item].choices.indexOf(answer_id);
                    if (index > -1) {
                        questionInfo.questions[item].choices.splice(index, 1);
                    }
                }
            }
        }
        const newQuestion = Array.from(questionInfo.questions);
        setQuestionInfo({ ...questionInfo, questions: newQuestion });
    };

    const updateCurrent = (index, oldIndex) => {
        if (index === oldIndex) return;
        // send old index question to server
        console.log(
            "send to server question_id " +
                questionInfo.questions[oldIndex].question_id +
                " choice " +
                JSON.stringify(questionInfo.questions[oldIndex].choices)
        );
        setCurrentQuestion(index);

        let newHeader = new Headers();
        newHeader.append("Authorization", jwtToken);
        newHeader.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            question_id: questionInfo.questions[oldIndex].question_id,
            answers_id: questionInfo.questions[oldIndex].choices
        });
        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/" + id + "/answers", {
            method: "POST",
            headers: newHeader,
            body: raw,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    const submitExam = index => {
        if (window.confirm("Do you want to submit?")) {
            console.log(
                "send to server question_id " +
                    questionInfo.questions[index].question_id +
                    " choice " +
                    JSON.stringify(questionInfo.questions[index].choices)
            );
            // send finish and return to examPage
            let newHeader = new Headers();
            newHeader.append("Authorization", jwtToken);
            newHeader.append("Content-Type", "application/json");
            let raw = JSON.stringify({
                question_id: questionInfo.questions[index].question_id,
                answers_id: questionInfo.questions[index].choices
            });
            fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/" + id + "/answers", {
                method: "POST",
                headers: newHeader,
                body: raw,
                redirect: "follow"
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    newHeader = new Headers();
                    newHeader.append("Authorization", jwtToken);
                    newHeader.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                        exam_id: parseInt(id)
                    });
                    fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/finish", {
                        method: "POST",
                        headers: newHeader,
                        body: raw,
                        redirect: "follow"
                    })
                        .then(response => response.json())
                        .then(result => {
                            window.location.href = "../examPage/" + id.toString();
                        })
                        .catch(error => {
                            console.log("error", error);
                            window.location.href = "../examPage/" + id.toString();
                        });
                })
                .catch(error => {
                    console.log("error", error);
                    newHeader = new Headers();
                    newHeader.append("Authorization", jwtToken);
                    newHeader.append("Content-Type", "application/json");
                    var raw = JSON.stringify({
                        exam_id: parseInt(id)
                    });
                    fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/finish", {
                        method: "POST",
                        headers: newHeader,
                        body: raw,
                        redirect: "follow"
                    })
                        .then(response => response.json())
                        .then(result => {
                            window.location.href = "../examPage/" + id.toString();
                        })
                        .catch(error => {
                            console.log("error", error);
                            window.location.href = "../examPage/" + id.toString();
                        });
                });
        }
    };

    const forceSubmitExam = () => {
        console.log(
            "send to server question_id " +
                questionInfo.questions[currentQuestion].question_id +
                " choice " +
                JSON.stringify(questionInfo.questions[currentQuestion].choices)
        );
        console.log("Force Submit");
        let newHeader = new Headers();
        newHeader.append("Authorization", jwtToken);
        newHeader.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            question_id: questionInfo.questions[currentQuestion].question_id,
            answers_id: questionInfo.questions[currentQuestion].choices
        });
        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/" + id + "/answers", {
            method: "POST",
            headers: newHeader,
            body: raw,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                newHeader = new Headers();
                newHeader.append("Authorization", jwtToken);
                newHeader.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    exam_id: parseInt(id)
                });
                fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/finish", {
                    method: "POST",
                    headers: newHeader,
                    body: raw,
                    redirect: "follow"
                })
                    .then(response => response.json())
                    .then(result => {
                        window.location.href = "../examPage/" + id.toString();
                    })
                    .catch(error => {
                        console.log("error", error);
                        window.location.href = "../examPage/" + id.toString();
                    });
            })
            .catch(error => {
                console.log("error", error);
                newHeader = new Headers();
                newHeader.append("Authorization", jwtToken);
                newHeader.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    exam_id: parseInt(id)
                });
                fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/finish", {
                    method: "POST",
                    headers: newHeader,
                    body: raw,
                    redirect: "follow"
                })
                    .then(response => response.json())
                    .then(result => {
                        window.location.href = "../examPage/" + id.toString();
                    })
                    .catch(error => {
                        console.log("error", error);
                        window.location.href = "../examPage/" + id.toString();
                    });
            });
        // send finish and return to examPage
    };

    useEffect(() => {
        // fetch data here using id
        let newHeader = new Headers();
        newHeader.append("Authorization", jwtToken);
        fetch("http://" + process.env.REACT_APP_BACKEND_URL + "exam/" + id, {
            method: "GET",
            headers: newHeader,
            redirect: "follow"
        })
            .then(response => response.json())
            .then(result => {
                setQuestionInfo(result);
            })
            .catch(error => {
                console.log("error", error);
            });
    }, []);

    const hhmmyyToMin = duration => {
        if (typeof duration === "undefined" || duration === null) return 0;
        let hms = duration;
        let a = hms.split(":");
        let min = +a[0] * 60 + +a[1] + +a[2] / 60;
        return min;
    };

    return (
        <div className="question-page-root-container">
            {/*<div className="question-page-default-header">Default Header</div>*/}
            <Header />
            {questionInfo === null ? (
                <div>
                    <h1 style={{ display: "flex", justifyContent: "center" }}>Loading</h1>
                </div>
            ) : (
                <div className="question-page-body">
                    <div className="question-page-body-left">
                        <div className="question-page-body-left-exam">{questionInfo.exam_name}</div>
                        <div className="question-page-body-left-subject">
                            Subject: {questionInfo.subject}
                        </div>
                        <div className="question-page-body-left-teacher">
                            Teacher: {questionInfo.creator_name}
                        </div>
                        <div className="question-page-body-left-duration">
                            <DisplayTime
                                duration={hhmmyyToMin(questionInfo.duration)}
                                startTime={new Date(questionInfo.start_time).getTime()}
                                endExamHandler={forceSubmitExam}
                            />
                        </div>
                        {/* <div className="question-page-body-left-pages"> */}
                        {/* {Math.floor(answers.length / questionsPerPage + 1)} - */}
                        {/* </div> */}
                        <DisplayPage
                            answers={questionInfo.questions}
                            changeCurrent={updateCurrent}
                            currentQuestion={currentQuestion}
                        />
                    </div>

                    <div className="question-page-body-right">
                        <ShowQuestion
                            currentQuestionIndex={currentQuestion}
                            currentQuestionInfo={questionInfo.questions[currentQuestion]}
                            updateChoose={updateChoice}
                            updateUnchoose={updateUnchoose}
                            changeCurrent={updateCurrent}
                            questionListLength={questionInfo.questions.length}
                            submitExam={submitExam}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const ShowQuestion = ({
    currentQuestionIndex,
    currentQuestionInfo,
    updateChoose,
    updateUnchoose,
    changeCurrent,
    questionListLength,
    submitExam
}) => {
    const checked = index => {
        if (currentQuestionInfo.question_type_id === 1) {
            if (currentQuestionInfo.choices.length === 0) return false;
            else if (currentQuestionInfo.choices[0] === index) {
                return true;
            } else return false;
        } else {
            if (currentQuestionInfo.choices.length === 0) {
                return false;
                // } else if (currentQuestionInfo.choices.length === 0) {
                //     return false
            } else if (currentQuestionInfo.choices.includes(index)) {
                return true;
            } else return false;
        }
    };

    const updateAnswer = (answer_id, checked) => {
        // console.log("update answer", answer_id, checked)
        if (currentQuestionInfo.question_type_id === 1) {
            if (currentQuestionInfo.choices[0] === answer_id) {
                updateUnchoose(currentQuestionInfo.question_id, answer_id);
                return;
            }
            updateChoose(currentQuestionInfo.question_id, answer_id);
            return;
        }
        if (!checked) {
            updateUnchoose(currentQuestionInfo.question_id, answer_id);
            return;
        } else {
            updateChoose(currentQuestionInfo.question_id, answer_id);
            return;
        }
    };
    return (
        <div className="question-page-body-right-wrapper">
            <div className="question-page-body-right-upper">
                <div className="question-page-body-right-upper-left">
                    {currentQuestionIndex + 1}.
                </div>
                <div className="question-page-body-right-upper-right">
                    {he.decode(currentQuestionInfo.question_content)}
                </div>
            </div>
            <hr></hr>

            <div className={"question-page-body-right-lower"}>
                {currentQuestionInfo.answers.map((item, index) => (
                    <div
                        key={
                            "question-" +
                            currentQuestionIndex.toString() +
                            "-answer-" +
                            index.toString()
                        }
                    >
                        <input
                            type={"checkbox"}
                            name={
                                "question-" +
                                currentQuestionIndex.toString() +
                                "-answer-" +
                                index.toString()
                            }
                            id={
                                "question-" +
                                currentQuestionIndex.toString() +
                                "-answer-" +
                                index.toString()
                            }
                            defaultChecked={checked(item.answer_id)}
                            onChange={e => {
                                updateAnswer(item.answer_id, e.target.checked);
                            }}
                        />
                        <label
                            htmlFor={
                                "question-" +
                                currentQuestionIndex.toString() +
                                "-answer-" +
                                index.toString()
                            }
                            className={
                                checked(item.answer_id)
                                    ? "question-page-body-right-lower-checked"
                                    : "question-page-body-right-lower-unchecked"
                            }
                        >
                            <div className="question-page-body-right-lower-choice-section">
                                <div
                                    className={
                                        currentQuestionInfo.question_type_id === 1
                                            ? "question-page-body-right-lower-choice-index"
                                            : "question-page-body-right-lower-choice-index-multi"
                                    }
                                >
                                    <div className="question-page-body-right-lower-choice-index-content">
                                        {String.fromCharCode(index + 65)}
                                    </div>
                                </div>
                                <div className="question-page-body-right-lower-choice-content">
                                    {he.decode(item.content)}
                                </div>
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="question-page-body-right-bottom">
                <div className="question-page-body-right-bottom-wrapper">
                    <button
                        className="question-page-body-right-bottom-back"
                        disabled={currentQuestionIndex === 0}
                        onClick={() =>
                            changeCurrent(currentQuestionIndex - 1, currentQuestionIndex)
                        }
                    >
                        &lt; Back
                    </button>
                    {currentQuestionIndex === questionListLength - 1 ? (
                        <button
                            className="question-page-body-right-bottom-next"
                            onClick={() => submitExam(currentQuestionIndex)}
                        >
                            Submit &gt;
                        </button>
                    ) : (
                        <button
                            className="question-page-body-right-bottom-next"
                            onClick={() =>
                                changeCurrent(currentQuestionIndex + 1, currentQuestionIndex)
                            }
                        >
                            Next &gt;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const DisplayTime = ({ duration, startTime, endExamHandler }) => {
    const formatNumber2Digits = number => {
        if (typeof number !== "number") return number;
        return (number < 10 ? "0" : "") + number.toString();
    };

    // time left in second
    const [timeLeft, setTimeLeft] = useState(
        Math.floor((startTime + duration * 60 * 1000 - Date.now()) / 1000)
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeLeft > 0) {
                const hour = Math.floor((timeLeft - 1) / 3600);
                const minute = Math.floor((timeLeft - 1 - hour * 3600) / 60);
                const second = (timeLeft - 1) % 60;
                setTimeLeft(timeLeft - 1);
                setRemainingTime({
                    hours: hour,
                    minutes: minute,
                    seconds: second
                });
            } else {
                endExamHandler();
                clearInterval(intervalId);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const [remainingTime, setRemainingTime] = useState({
        // hours: Math.floor(duration / 60),
        // minutes: duration % 60,
        // seconds: 0,
        hours: "xx",
        minutes: "xx",
        seconds: "xx"
    });

    return (
        <div>
            Time left: {formatNumber2Digits(remainingTime.hours)}:
            {formatNumber2Digits(remainingTime.minutes)}:
            {formatNumber2Digits(remainingTime.seconds)}
        </div>
    );
};

const DisplayPage = ({ answers, changeCurrent, currentQuestion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setCurrentPage(Math.floor(currentQuestion / questionsPerPage) + 1);
    }, [currentQuestion]);
    const temp = new Array(Math.floor((answers.length - 1) / questionsPerPage + 1)).fill("");
    return (
        <div className="question-page-body-left-pages">
            <div className="question-page-button-list">
                {answers.map((item, index) =>
                    index < currentPage * questionsPerPage &&
                    index >= (currentPage - 1) * questionsPerPage ? (
                        <div className="question-page-button-content-wrapper" key={index}>
                            <button
                                key={item.question_id}
                                onClick={() => changeCurrent(index, currentQuestion)}
                                className={
                                    (index === currentQuestion
                                        ? "question-page-button-current"
                                        : "question-page-button") +
                                    " " +
                                    (item.choices === null || item.choices.length === 0
                                        ? "question-page-button-incomplete"
                                        : "question-page-button-complete")
                                }
                            >
                                {index + 1}
                            </button>
                        </div>
                    ) : (
                        ""
                    )
                )}
            </div>
            <div className="question-page-body-left-page-number">
                <span>Pages:</span>
                <div className="question-page-body-left-page-number-buttons">
                    {temp.map((_, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={
                                    currentPage === index + 1
                                        ? "question-page-body-left-page-number-current-btn"
                                        : "question-page-body-left-page-number-btn"
                                }
                            >
                                {/* {index + 1} */}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
