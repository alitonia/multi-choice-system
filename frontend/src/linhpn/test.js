/* eslint-disable no-unused-vars */
const answers = [
  {
    choices: ["Sonic The Hedgehog", "Super Mario 64", "Mega Man", "Rad Mobile"],
    question:
      "Which game did &quot;Sonic The Hedgehog&quot; make his first appearance in?",
    questionID: 550,
    studentAnswer: "",
  },
  {
    choices: ["False", "True"],
    question: "Peter Molyneux was the founder of Bullfrog Productions.",
    questionID: 713,
    studentAnswer: "",
  },
  {
    choices: ["Norway", "Sweden", "Denmark", "Finland"],
    question: "What country is not a part of Scandinavia?",
    questionID: 544,
    studentAnswer: "",
  },
];

const oldAnswers = answers;

const updateAnswer = (id, answer) => {
  for (var item in answers) {
    if (answers[item].questionID === id) {
      answers[item].studentAnswer = answer;
    }
  }
};

updateAnswer(550, "hello");

// console.log(answers);

// console.log(oldAnswers === answers);

const newAnswers = Array.from(answers);

// console.log(newAnswers);

console.log(answers === newAnswers);
