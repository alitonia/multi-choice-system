import { Placeholder } from "./Placeholder.js";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import AdminDashboard from "./admin/Dashboard";
import CreateAccount from "./admin/CreateAccount";

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
        path: "/examPage",
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
        path: "/",
        others: {},
        component: Placeholder
    }
].filter(r => !!r && !!r.path && !!r.component);
