import { Placeholder } from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import EditExam from "./CRUDExam/EditExam.js";
import CreateExam from "./CRUDExam/CreateExam.js";
import AdminDashboard from "./admin/Dashboard";
import CreateAccount from "./admin/CreateAccount";
import EditAccount from "./account/EditAccount";

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
