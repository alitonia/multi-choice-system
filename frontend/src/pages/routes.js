import { Placeholder } from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import ManageExaminees from "./ManageExaminees/index.js";

export const routes = [
    {
        path: "/dashboard",
        others: {},
        component: Dashboard
    },
    {
        path: "/dashboard",
        others: {},
        component: Dashboard
    },
    {
        path: "/manageExaminees",
        others: {},
        component: ManageExaminees
    },
    {
        path: "/login",
        others: {},
        component: LoginPage
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
