import {Placeholder} from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import QuestionPage from "./QuestionPage";
import EditExam from "./CRUDExam/EditExam.js";
import CreateExam from "./CRUDExam/CreateExam.js";
import AdminDashboard from "./admin/Dashboard";
import CreateAccount from "./admin/CreateAccount";
import EditAccount from "./account/EditAccount";
import CRUDQuestionPage from "./CRUDQuestion/index.js";

export const routes = [
    {
        path: "/dashboard",
        others: {},
        component: Dashboard
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
        path: "/",
        others: {},
        component: Placeholder
    }
].filter(r => !!r && !!r.path && !!r.component);
