import { Placeholder } from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";

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
        path: "/exam",
        others: {},
        component: ExamPage
    },
    {
        path: "/",
        others: {},
        component: LoginPage
    }
].filter(r => !!r && !!r.path && !!r.component);
