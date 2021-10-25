/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./question-page.css";
import { useState, useEffect } from "react";
import he from "he";

const questionsPerPage = 40;
const questionsPerRow = 5;

const randomId = () => {
  return (
    Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000) + 1
  );
};

const QuestionPage = ({
  questionAPI = "https://opentdb.com/api.php?amount=50",
  examName = "ITSS Mana",
  teacherName = "Mr, Linhpn",
  duration = 60,
}) => {
  //   const [pageNumber, setPageNumber] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const updateAnswer = (id, answer) => {
    // console.log(id, answer);
    for (var item in answers) {
      if (answers[item].questionID === id) {
        answers[item].studentAnswer = answer;
      }
    }
    const newAnswers = Array.from(answers);
    localStorage.setItem("default_exam", JSON.stringify(newAnswers));
    setAnswers(newAnswers);
  };

  const updateCurrent = (index) => {
    setCurrentQuestion(index);
  };

  const submitExam = () => {
    if (window.confirm("Do you want to submit?")) {
      console.log(answers);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("default_exam") === null) {
      fetch(questionAPI)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data.results;
        })
        .then((result) => {
          var answerList = result.map((item) => {
            return {
              questionID: randomId(),
              question: item.question,
              choices: [...item.incorrect_answers].concat(item.correct_answer),
              studentAnswer: "",
            };
          });
          // console.log(answerList);
          localStorage.setItem("default_exam", JSON.stringify(answerList));
          setAnswers(answerList);
        });
    } else {
      setAnswers(JSON.parse(localStorage.getItem("default_exam")));
    }
  }, []);

  return (
    <div>
      <div className="question-page-default-header">Default Header</div>
      {answers.length === 0 ? (
        <div>Loading Screen Plz</div>
      ) : (
        <div className="question-page-body">
          <div className="question-page-body-left">
            <div className="question-page-body-left-exam">{examName}</div>
            <div className="question-page-body-left-teacher">{teacherName}</div>
            <div className="question-page-body-left-duration">
              {duration} minutes
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
  return (
    <div className="question-page-body-left-pages">
      <div className="question-page-button-list">
        {answers.map((item, index) => (
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
            {index}
          </button>
        ))}
      </div>
      <div>Pages: {Math.floor(answers.length / questionsPerPage + 1)}</div>
    </div>
  );
};

const DisplayQuestion = ({
  currentQuestion,
  question,
  changeAnswer,
  changeCurrent,
  questionListLength,
  submitExam,
}) => {
  const updateCheckedState = (index, value, checked, id) => {
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
    changeAnswer(id, value);
  };

  return (
    <div>
      <div className="question-page-body-right-upper">
        <div className="question-page-body-right-upper-left">
          {currentQuestion}.
        </div>
        <div className="question-page-body-right-upper-right">
          {he.decode(question.question)}
        </div>
      </div>

      <div className="question-page-body-right-lower">
        {question.choices.map((item, index) => (
          <div
            key={
              "question-" + currentQuestion.toString() + "-" + index.toString()
            }
          >
            <input
              type="checkbox"
              name={
                "question-" +
                currentQuestion.toString() +
                "-" +
                index.toString()
              }
              value={item}
              id={
                "question-" +
                currentQuestion.toString() +
                "-" +
                index.toString()
              }
              defaultChecked={item === question.studentAnswer}
              onChange={(event) =>
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
                "question-" +
                currentQuestion.toString() +
                "-" +
                index.toString()
              }
            >
              {he.decode(item)}
            </label>
            <br></br>
          </div>
        ))}
      </div>

      <div className="question-page-body-right-bottom">
        <button
          className="question-page-body-right-bottom-back"
          disabled={currentQuestion === 0}
          onClick={() => changeCurrent(currentQuestion - 1)}
        >
          Back
        </button>
        {currentQuestion === questionListLength - 1 ? (
          <button
            className="question-page-body-right-bottom-back"
            onClick={submitExam}
          >
            Submit
          </button>
        ) : (
          <button
            className="question-page-body-right-bottom-back"
            onClick={() => changeCurrent(currentQuestion + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
export default QuestionPage;
