/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./QuestionPage.css";
import { useState, useEffect } from "react";
import he from "he";
import Header from "../../components/header/Header";
import {useParams} from "react-router-dom";

const questionsPerPage = 30;
const questionsPerRow = 5;

const randomId = () => {
    return Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000) + 1;
};

const QuestionPage = ({
    questionAPI = "https://opentdb.com/api.php?amount=50",
}) => {
    //   const [pageNumber, setPageNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [examInfo, setExamInfo] = useState({
        exam_id: '',
        exam_name: '',
        subject: '',
        creator: {name: ""},
        start_time: Date.now(),
        duration: 0,
    });
    const { id } = useParams();
    const updateAnswer = (id, answer) => {
        // console.log(id, answer);
        for (var item in answers) {
            if (answers[item].questionID === id) {
                answers[item].studentAnswer = answer;
            }
        }
        const newAnswers = Array.from(answers);
        // localStorage.setItem("default_exam", JSON.stringify(newAnswers));
        setAnswers(newAnswers);
    };

    const updateCurrent = index => {
        setCurrentQuestion(index);
    };

    const submitExam = () => {
        if (window.confirm("Do you want to submit?")) {
            console.log(answers);
            // localStorage.removeItem("default_exam");
            // localStorage.removeItem("start_time");
        }
    };

    const forceSubmitExam = () => {
        console.log("Force Submit");
        // localStorage.removeItem("default_exam");
        // localStorage.removeItem("start_time");
    };

    useEffect(() => {
        setExamInfo({
            exam_id: '2110',
            exam_name: 'exam_name_10',
            subject: 'subject_10',
            creator: {
                id: 1,
                department: 'defence against the dark art',
                name: 'alitonia_10'
            },
            start_time: 1640186007857,
            duration: 800
        });
        if (localStorage.getItem("default_exam") === null) {
            fetch(questionAPI)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    return data.results;
                })
                .then(result => {
                    var answerList = result.map(item => {
                        return {
                            questionID: randomId(),
                            question: item.question,
                            choices: [...item.incorrect_answers].concat(item.correct_answer),
                            studentAnswer: ""
                        };
                    });
                    // console.log(answerList);
                    localStorage.setItem("default_exam", JSON.stringify(answerList));
                    setAnswers(answerList);
                });
        } else {
            setAnswers(JSON.parse(localStorage.getItem("default_exam")));
        }
        // if (localStorage.getItem("start_time") === null) {
        //     localStorage.setItem("start_time", Date.now().toString());
        // } else {
        //     if (parseInt(localStorage.getItem("start_time")) + duration * 60 * 1000 < Date.now()) {
        //         forceSubmitExam();
        //     }
        // }
    }, []);

    return (
        <div className="question-page-root-container">
            {/*<div className="question-page-default-header">Default Header</div>*/}
            <Header />
            {answers.length === 0 ? (
                <div>Loading Screen Plz</div>
            ) : (
                <div className="question-page-body">
                    <div className="question-page-body-left">
                        <div className="question-page-body-left-exam">{examInfo.exam_name}</div>
                        <div className="question-page-body-left-subject">Subject: {examInfo.subject}</div>
                        <div className="question-page-body-left-teacher">Teacher: {examInfo.creator.name}</div>
                        <div className="question-page-body-left-duration">
                            <DisplayTime
                                duration={examInfo.duration}
                                startTime={
                                    // localStorage.getItem("start_time") !== null
                                    //     ? parseInt(localStorage.getItem("start_time")) :
                                        examInfo.start_time
                                }
                                endExamHandler={forceSubmitExam}
                            />
                        </div>
                        {/* <div className="question-page-body-left-pages"> */}
                        {/* {Math.floor(answers.length / questionsPerPage + 1)} - */}
                        {/* </div> */}
                        <DisplayPage
                            answers={answers}
                            changeCurrent={updateCurrent}
                            currentQuestion={currentQuestion}
                        />
                    </div>

                    <div className="question-page-body-right">
                        <DisplayQuestion
                            currentQuestion={currentQuestion}
                            question={answers[currentQuestion]}
                            changeAnswer={updateAnswer}
                            changeCurrent={updateCurrent}
                            questionListLength={answers.length}
                            submitExam={submitExam}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const DisplayPage = ({ answers, changeCurrent, currentQuestion }) => {
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setCurrentPage(Math.floor(currentQuestion / questionsPerPage) + 1);
    }, [currentQuestion]);
    const temp = new Array(Math.floor(answers.length / questionsPerPage + 1)).fill("");
    return (
        <div className="question-page-body-left-pages">
            <div className="question-page-button-list">
                {answers.map((item, index) =>
                    index < currentPage * questionsPerPage &&
                    index >= (currentPage - 1) * questionsPerPage ? (
                        <div className="question-page-button-content-wrapper" key={index}>
                            <button
                                key={item.questionID}
                                onClick={() => changeCurrent(index)}
                                className={
                                    (index === currentQuestion
                                        ? "question-page-button-current"
                                        : "question-page-button") +
                                    " " +
                                    (item.studentAnswer === ""
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

const DisplayQuestion = ({
    currentQuestion,
    question,
    changeAnswer,
    changeCurrent,
    questionListLength,
    submitExam
}) => {
    const updateCheckedState = (index, value, checked, id) => {
        // console.log(index, value, checked, id);
        for (var item in question.choices) {
            document.getElementById(
                "question-" + currentQuestion.toString() + "-" + item.toString()
            ).checked = false;
        }
        if (checked === true) {
            document.getElementById(
                "question-" + currentQuestion.toString() + "-" + index.toString()
            ).checked = true;
        }
        if (checked === true) changeAnswer(id, value);
        else changeAnswer(id, "");
    };

    return (
        <div className="question-page-body-right-wrapper">
            <div className="question-page-body-right-upper">
                <div className="question-page-body-right-upper-left">{currentQuestion + 1}.</div>
                <div className="question-page-body-right-upper-right">
                    {he.decode(question.question)}
                </div>
            </div>
            <hr></hr>

            <div className="question-page-body-right-lower">
                {question.choices.map((item, index) => (
                    <div key={"question-" + currentQuestion.toString() + "-" + index.toString()}>
                        <input
                            type="checkbox"
                            name={"question-" + currentQuestion.toString() + "-" + index.toString()}
                            value={item}
                            id={"question-" + currentQuestion.toString() + "-" + index.toString()}
                            defaultChecked={item === question.studentAnswer}
                            onChange={event =>
                                updateCheckedState(
                                    index,
                                    event.target.value,
                                    event.target.checked,
                                    question.questionID
                                )
                            }
                        />
                        <label
                            htmlFor={
                                "question-" + currentQuestion.toString() + "-" + index.toString()
                            }
                            className={
                                item === question.studentAnswer
                                    ? "question-page-body-right-lower-checked"
                                    : "question-page-body-right-lower-unchecked"
                            }
                        >
                            <div className="question-page-body-right-lower-choice-section">
                                <div className="question-page-body-right-lower-choice-index">
                                    <div className="question-page-body-right-lower-choice-index-content">
                                        {index === 0
                                            ? "A"
                                            : index === 1
                                            ? "B"
                                            : index === 2
                                            ? "C"
                                            : "D"}
                                    </div>
                                </div>
                                <div className="question-page-body-right-lower-choice-content">
                                    {he.decode(item)}
                                </div>
                            </div>
                        </label>
                        <br></br>
                    </div>
                ))}
            </div>

            <div className="question-page-body-right-bottom">
                <div className="question-page-body-right-bottom-wrapper">
                    <button
                        className="question-page-body-right-bottom-back"
                        disabled={currentQuestion === 0}
                        onClick={() => changeCurrent(currentQuestion - 1)}
                    >
                        &lt; Back
                    </button>
                    {currentQuestion === questionListLength - 1 ? (
                        <button
                            className="question-page-body-right-bottom-next"
                            onClick={submitExam}
                        >
                            Submit &gt;
                        </button>
                    ) : (
                        <button
                            className="question-page-body-right-bottom-next"
                            onClick={() => changeCurrent(currentQuestion + 1)}
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

export default QuestionPage;
