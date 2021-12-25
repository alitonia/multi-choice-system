import { Placeholder } from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import EditExam from "./CRUDExam/EditExam.js";

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
        path: "/examPage",
        others: {},
        component: ExamPage
    },
    {
        path: "/",
        others: {},
        component: Placeholder
    }
].filter(r => !!r && !!r.path && !!r.component);
