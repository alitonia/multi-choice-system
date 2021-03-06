/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./CRUDQuestionPage.css";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Dialogs from "./dialogs";

import APIClient from "./APIClient";

const questionsPerPage = 30;
const questionsPerRow = 5;

const CRUDQuestionPage = ({}) => {
    const cloneQuestionInfo = originalQuestionInfo => {
        return JSON.parse(JSON.stringify(originalQuestionInfo));
    };

    const { examID } = useParams();

    const [examInfo, setExamInfo] = useState({
        exam_id: "",
        exam_name: "",
        subject: "",
        creator: { name: "" },
        start_time: Date.now(),
        duration: 0
    });

    const [questionInfos, setQuestionInfos] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [editingQuestionInfo, setEditingQuestionInfo] = useState(null);

    const [isUnsavedChangesConfirmationShowed, setIsUnsavedChangesConfirmationShowed] =
        useState(false);
    const [unsavedChangesDialogActions, setUnsavedChangesDialogActions] = useState(null);

    useMemo(() => {
        if (questionInfos[currentQuestionIndex]) {
            setEditingQuestionInfo(cloneQuestionInfo(questionInfos[currentQuestionIndex]));
        }
    }, [questionInfos, currentQuestionIndex]);

    useEffect(() => {
        APIClient.getExamInfo(examID).then(examInfo => {
            if (examInfo) {
                setExamInfo(examInfo);
            }
        });

        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const questionInfos = await APIClient.getQuestionInfos(examID);
            if (questionInfos) {
                setQuestionInfos(questionInfos);
                changeQuestionIndex(Math.min(currentQuestionIndex, questionInfos.length - 1));
                return true;
            }
        } catch (e) {
            console.warn(e);
        }

        return false;
    };

    const changeQuestionIndex = index => {
        if (index < 0 || index > questionInfos.length - 1) {
            return;
        }

        if (hasUnsavedChanges) {
            alert("You have unsaved changes");
        } else {
            setCurrentQuestionIndex(index);
        }
    };

    const addQuestion = () => {
        questionInfos.push({
            exam_id: examID,
            question_type_id: 1,
            question_content: "",
            question_group_id: 1,
            question_id: -1,
            question_group: null,
            question_type: [
                {
                    question_type_id: 1,
                    description: "single_answer"
                }
            ],
            answers: []
        });

        setQuestionInfos([...questionInfos]);

        changeQuestionIndex(questionInfos.length - 1);
    };

    const deleteQuestion = questionIndex => {
        APIClient.deleteQuestion(questionInfos[questionIndex].question_id).then(deleteResult => {
            if (deleteResult) {
                fetchQuestions();
            } else {
                const message = "Fail to delete question";
                console.log(message);
                alert(message);
            }
        });
    };

    const notifyQuestionDirty = questionIndex => {
        setEditingQuestionInfo({ ...editingQuestionInfo });

        if (!hasUnsavedChanges) {
            setHasUnsavedChanges(true);
        }
    };

    const saveChanges = async () => {
        if (!editingQuestionInfo.answers || editingQuestionInfo.answers.length === 0) {
            alert("Question must have an answer");
            return false;
        }
        const success = await APIClient.createOrUpdateQuestion(editingQuestionInfo);
        if (success) {
            fetchQuestions();
            setHasUnsavedChanges(false);
        } else {
            const message = "Fail to save changes";
            console.log(message);
            alert(message);
        }

        return success;
    };

    const discardChanges = () => {
        setEditingQuestionInfo(cloneQuestionInfo(questionInfos[currentQuestionIndex]));
        setHasUnsavedChanges(false);
    };

    const toggleUnsavedChangesDialog = show => {
        setIsUnsavedChangesConfirmationShowed(show);
    };

    return (
        <div className="question-page-root-container">
            <Header />
            <div className="question-page-body">
                <LeftPanel
                    examInfo={examInfo}
                    questionInfos={questionInfos}
                    currentQuestionIndex={currentQuestionIndex}
                    changeQuestionIndex={changeQuestionIndex}
                    addQuestion={addQuestion}
                />
                <Dialogs.UnsavedChangesConfirmationDialog
                    isOpened={isUnsavedChangesConfirmationShowed}
                    onClose={e => {
                        toggleUnsavedChangesDialog(false);
                    }}
                    onSaveClicked={unsavedChangesDialogActions?.saveAction}
                    onDiscardClicked={unsavedChangesDialogActions?.discardAction}
                />
                {hasUnsavedChanges ? 1 : 0}
                <div className="question-page-body-right">
                    <ShowQuestion
                        questionIndex={currentQuestionIndex}
                        questionInfo={editingQuestionInfo}
                        deleteQuestion={deleteQuestion}
                        notifyQuestionDirty={notifyQuestionDirty}
                    />
                    <QuestionBottomNavigation
                        currentQuestionIndex={currentQuestionIndex}
                        questionCount={questionInfos.length}
                        changeQuestion={changeQuestionIndex}
                        hasUnsavedChanges={hasUnsavedChanges}
                        saveChanges={saveChanges}
                        discardChanges={discardChanges}
                    />
                </div>
            </div>
        </div>
    );
};

const ShowQuestion = ({ questionIndex, questionInfo, deleteQuestion, notifyQuestionDirty }) => {
    const [isDeleteQuestionConfirmationShowed, setIsDeleteQuestionConfirmationShowed] =
        useState(false);

    if (!questionInfo) {
        return null;
    }

    const closeDeleteQuestionConfirmation = () => {
        setIsDeleteQuestionConfirmationShowed(false);
    };

    const confirmDeleteQuestion = () => {
        deleteQuestion(questionIndex);
        closeDeleteQuestionConfirmation();
    };

    const markThisQuestionAsDirty = () => {
        notifyQuestionDirty(questionIndex);
    };

    const addAnswer = () => {
        questionInfo.answers.push({
            question_id: questionInfo.question_id,
            answer_id: -1,
            content: "",
            is_correct: false
        });

        markThisQuestionAsDirty();
    };

    const changeAnswerContent = (answerIndex, newContent) => {
        questionInfo.answers[answerIndex].content = newContent;

        markThisQuestionAsDirty();
    };

    const deleteAnswer = answerIndex => {
        questionInfo.answers.splice(answerIndex, 1);

        markThisQuestionAsDirty();
    };

    const toggleTrueAnswer = answerIndex => {
        if (questionInfo.question_type[0].question_type_id === 1) {
            for (const answer of questionInfo.answers) {
                answer.is_correct = false;
            }
        }

        const answer = questionInfo.answers[answerIndex];
        answer.is_correct = !answer.is_correct;

        markThisQuestionAsDirty();
    };

    const changeQuestionType = questionTypeID => {
        questionInfo.question_type = [
            {
                question_type_id: questionTypeID,
                description: questionTypeID === 1 ? "single_answer" : "multiple_answer"
            }
        ];

        for (const answer of questionInfo.answers) {
            answer.is_correct = false;
        }

        markThisQuestionAsDirty();
    };

    const updateQuestionContent = newQuestionContent => {
        questionInfo.question_content = newQuestionContent;

        markThisQuestionAsDirty();
    };

    return (
        <div className="question-page-body-right-container">
            <div className="question-page-body-right-wrapper">
                <div className="question-page-body-right-top">
                    <div className="question-page-body-right-top-column-1">
                        <div className="question-page-body-right-top-column-pad-right">
                            Question type:
                        </div>
                        <select
                            value={questionInfo.question_type[0].question_type_id}
                            onChange={e => changeQuestionType(parseInt(e.target.value))}
                        >
                            <option value={1}>Single-choice</option>
                            <option value={2}>Multiple-choice</option>
                        </select>
                    </div>
                    <div className="question-page-body-right-top-column-2">
                        <div>
                            <div className="material-icons question-page-body-right-top-icon">
                                delete_forever
                            </div>
                            <div className="question-page-body-right-top-icon-description">
                                : Delete
                            </div>
                        </div>
                        <div>
                            <div className="material-icons question-page-body-right-top-icon">
                                check
                            </div>
                            <div className="question-page-body-right-top-icon-description">
                                : Mark as answer
                            </div>
                        </div>
                    </div>
                </div>
                <div className="question-page-body-right-middle">
                    <div className="question-page-body-right-middle-column-1">
                        {questionIndex + 1}.
                    </div>
                    <div className="question-page-body-right-middle-column-2">
                        <textarea
                            value={questionInfo.question_content}
                            onChange={e => updateQuestionContent(e.target.value)}
                        />
                    </div>
                    <div className="question-page-body-right-middle-column-3">
                        <div
                            className="material-icons"
                            onClick={e => setIsDeleteQuestionConfirmationShowed(true)}
                        >
                            delete_forever
                        </div>
                    </div>
                    <Dialogs.DeleteQuestionConfirmationDialog
                        isOpened={isDeleteQuestionConfirmationShowed}
                        onClose={closeDeleteQuestionConfirmation}
                        onDeleteClicked={confirmDeleteQuestion}
                    />
                </div>
                <hr></hr>
                <div className="question-page-body-right-lower">
                    {questionInfo.answers.map((answer, answerIndex) => (
                        <div
                            key={answerIndex}
                            className="question-page-body-right-lower-choice-section"
                        >
                            <div className="question-page-body-right-lower-choice-index-container">
                                <div
                                    className={
                                        questionInfo.question_type[0].question_type_id === 1
                                            ? "question-page-body-right-lower-choice-index"
                                            : "question-page-body-right-lower-choice-index-multi"
                                    }
                                >
                                    <div className="question-page-body-right-lower-choice-index-content">
                                        {String.fromCharCode(65 + answerIndex)}
                                    </div>
                                </div>
                            </div>
                            <div className="question-page-body-right-lower-choice-content">
                                <textarea
                                    value={answer.content}
                                    onChange={e => changeAnswerContent(answerIndex, e.target.value)}
                                />
                            </div>
                            <div className="question-page-body-right-lower-choice-button-group">
                                <div
                                    className="material-icons"
                                    onClick={e => deleteAnswer(answerIndex)}
                                >
                                    delete_forever
                                </div>
                                <div
                                    className={`material-icons ${
                                        answer.is_correct
                                            ? "question-page-body-answer-marked"
                                            : "question-page-body-answer-unmarked"
                                    }`}
                                    onClick={e => toggleTrueAnswer(answerIndex)}
                                >
                                    check
                                </div>
                            </div>
                        </div>
                    ))}
                    <div
                        className="question-page-body-lower-choice-add-button"
                        onClick={e => addAnswer()}
                    >
                        Add answer
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuestionBottomNavigation = ({
    currentQuestionIndex,
    questionCount,
    changeQuestion,
    hasUnsavedChanges,
    saveChanges,
    discardChanges
}) => {
    return (
        <div className="question-page-body-right-bottom">
            <div className="question-page-body-right-bottom-wrapper">
                <button
                    className="question-page-body-right-bottom-back"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => changeQuestion(currentQuestionIndex - 1)}
                >
                    &lt; Back
                </button>
                {hasUnsavedChanges && (
                    <div className="question-page-body-right-bottom-changes-container">
                        <div>You have unsaved changes</div>
                        <div className="question-page-body-right-bottom-changes-button-group">
                            <button onClick={saveChanges}>Save Changes</button>
                            <button onClick={discardChanges}>Discard</button>
                        </div>
                    </div>
                )}
                <button
                    className="question-page-body-right-bottom-next"
                    disabled={currentQuestionIndex === questionCount - 1}
                    onClick={() => changeQuestion(currentQuestionIndex + 1)}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
};

const LeftPanel = ({
    examInfo,
    questionInfos,
    currentQuestionIndex,
    changeQuestionIndex,
    addQuestion
}) => {
    return (
        <div className="question-page-body-left">
            <div className="question-page-body-left-exam">{examInfo.exam_name}</div>
            <div className="question-page-body-left-subject">Subject: {examInfo.subject}</div>
            <div className="question-page-body-left-teacher">Teacher: {examInfo.creator.name}</div>
            <div className="question-page-body-left-duration">Total time: {examInfo.duration}</div>
            <QuestionLeftNavigation
                questions={questionInfos}
                currentQuestionIndex={currentQuestionIndex}
                changeQuestion={changeQuestionIndex}
                addQuestion={addQuestion}
            />
        </div>
    );
};

const QuestionLeftNavigation = ({
    questions,
    currentQuestionIndex,
    changeQuestion,
    addQuestion
}) => {
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        setCurrentPage(Math.floor(currentQuestionIndex / questionsPerPage));
    }, [currentQuestionIndex]);

    const pageIndices = new Array(Math.ceil(questions.length / questionsPerPage)).fill("");

    const questionIndexStartInPage = currentPage * questionsPerPage;

    return (
        <div className="question-page-body-left-pages">
            <div className="question-page-button-list">
                {questions
                    .slice(questionIndexStartInPage, questionIndexStartInPage + questionsPerPage)
                    .map((question, indexInPage) => {
                        const questionIndex = questionIndexStartInPage + indexInPage;

                        return (
                            <div
                                className="question-page-button-content-wrapper"
                                key={questionIndex}
                            >
                                <button
                                    key={question.question_id}
                                    onClick={() => changeQuestion(questionIndex)}
                                    className={
                                        questionIndex === currentQuestionIndex
                                            ? "question-page-button-current"
                                            : "question-page-button"
                                    }
                                >
                                    {questionIndex + 1}
                                </button>
                            </div>
                        );
                    })}
                <div className="question-page-button-content-wrapper">
                    <button onClick={() => addQuestion()} className={"question-page-button"}>
                        +
                    </button>
                </div>
            </div>
            <div className="question-page-body-left-page-number">
                <span>Pages:</span>
                <div className="question-page-body-left-page-number-buttons">
                    {pageIndices.map((_, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={
                                    currentPage === index
                                        ? "question-page-body-left-page-number-current-btn"
                                        : "question-page-body-left-page-number-btn"
                                }
                            ></button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CRUDQuestionPage;
