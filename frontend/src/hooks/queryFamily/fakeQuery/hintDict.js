const _dataAccount = id => ({
    account_id: id,
    email: `test_admin${id}@mana.itss`,
    name: `fluffy_admin_${id}`,
    date_of_birth: "20-06-1999",
    phone_number: "0123456788",
    enable: id % 3 === 0 ? "FALSE" : "TRUE",
    role: {
        role_id: (id % 2) + 1,
        name: id === 2 ? "examiner" : "examinee"
    }
});

const _dataAccounts = [...Array(15).keys()].map(id => {
    return _dataAccount(id + 1);
});

const _dataStatus = status => ({
    status
});

const _dataLogin = role => {
    return {
        ..._dataAccount(1),
        role: role,
        jwt_token: "jwt_token_123456"
    };
};

const _dataExam = id => ({
    exam_id: `21${id}`,
    exam_name: `exam_name_${id}`,
    subject: `subject_${id}`,
    creator: {
        id: 1,
        department: "defence against the dark art",
        name: `alitonia_${id}`
    },
    start_time: Date.now(),
    duration: 190
});

const _dataExams = [...Array(15).keys()].map(id => {
    return _dataExam(id + 1);
});

const _dataAnswer = id => ({
    answer_id: id,
    content: `answer_no ${id} <h1>HELLO ${id}</h1>`,
    is_correct: id % 4 === 1,
    question_id: 431
});

const _dataAnswers = [...Array(4).keys()].map(id => {
    return _dataAnswer(id + 1);
});

const _dataQuestion = id => ({
    question_id: `43${id}`,
    question_content: `content for ${id}`,
    exam_id: `${211}`,
    question_group: [{ question_group_id: 1, description: "TEST_QT_1" }],
    question_type: [
        {
            question_type_id: (id % 2) + 1,
            description: id % 2 === 0 ? "single_answer" : "multiple_answer"
        }
    ],
    grading_rule: [
        {
            rule_id: 1,
            rule_content: "basic"
        }
    ],
    answers: _dataAnswers
});

const _dataQuestions = [...Array(30).keys()].map(id => {
    return {
        ..._dataQuestion(id + 1)
    };
});

const _dataQuestionsExaminee = _dataQuestions.map(x => ({
    ...x,
    choice: { answer_id: x.question_id === 431 ? 1 : null }
}));

const _dataLogs = [...Array(50).keys()].map(id => ({
    log_id: id,
    examinee_account_id: id % 10,
    exam_id: 211,
    action: "binge_" + (id % 4),
    time: "2020-12-29 20:11:33-07"
}));

const hintDict = {
    account: _dataAccount(1),
    accounts: _dataAccounts,
    enable: _dataStatus("OK"),
    disable: _dataStatus("OK"),
    admin: _dataLogin("admin"),
    examiner: _dataLogin("examiner"),
    examinee: _dataLogin("examinee"),
    exam: _dataExam(10),
    exams: _dataExams,
    question: _dataQuestion(1),
    questionsExaminer: _dataQuestions,
    questionsExaminee: _dataQuestionsExaminee,
    answer: _dataAnswer(1),
    answers: _dataAnswers,
    choice: _dataStatus("OK"),
    logs: _dataLogs
};

Object.freeze(hintDict);

export { hintDict };
