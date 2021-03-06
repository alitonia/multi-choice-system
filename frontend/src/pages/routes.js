import { Placeholder } from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import ManageExaminees from "./ManageExaminees/index.js";
import EditExam from "./CRUDExam/EditExam.js";
import CreateExam from "./CRUDExam/CreateExam.js";
import AdminDashboard from "./admin/Dashboard";
import CreateAccount from "./admin/CreateAccount";
import EditAccount from "./account/EditAccount";
import ExamStatistic from "./ExamStatistic/index.js";
import QuestionPage from "./QuestionPage/index.js";
import CRUDQuestionPage from "./CRUDQuestion/index.js";
import { Page404 } from "./404/404";
// import { Placeholder } from "./Placeholder";
import { HomeRoot } from "./Home/HomeRoot";

export const routes = [
    {
        path: "/dashboard",
        others: {},
        component: Dashboard
    },
    {
        path: "/manageExaminees/:id",
        others: {},
        component: ManageExaminees
    },
    {
        path: "/login",
        others: {},
        component: LoginPage
    },
    {
        path: "/examPage/:id",
        others: {},
        component: ExamPage
    },
    {
        path: "/editExam/:id",
        others: {},
        component: EditExam
    },
    {
        path: "/createExam",
        others: {},
        component: CreateExam
    },
    {
        path: "/exam/:id",
        others: {},
        component: ExamPage
    },
    {
        path: "/questionPage/:id",
        others: {},
        component: QuestionPage
    },
    {
        path: "/examiner/editExam/:examID/question",
        others: {},
        component: CRUDQuestionPage
    },
    {
        path: "/admin/dashboard",
        others: {},
        component: AdminDashboard
    },
    {
        path: "/admin/createAccount",
        others: {},
        component: CreateAccount
    },
    {
        path: "/account/edit/:id",
        others: {},
        component: EditAccount
    },
    {
        path: "/examiner/examStatistic/:id",
        others: {},
        component: ExamStatistic
    },
    {
        path: "/",
        others: {
            exact: true
        },
        component: HomeRoot
    },
    {
        path: "/",
        others: {},
        component: Page404
    }
].filter(r => !!r && !!r.path && !!r.component);
