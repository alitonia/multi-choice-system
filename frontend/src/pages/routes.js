import { Placeholder } from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import EditExam from "./CRUDExam/EditExam.js";
import CreateExam from "./CRUDExam/CreateExam.js";

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
        path: "/editExam",
        others: {},
        component: EditExam
    },
    {
        path: "/createExam",
        others: {},
        component: CreateExam
    },
    {
        path: "/examPage",
        others: {},
        component: ExamPage
    },
    {
        path: "/",
        others: {},
        component: LoginPage
    }
].filter(r => !!r && !!r.path && !!r.component);
