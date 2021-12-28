import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import ManageExaminees from "./ManageExaminees/index.js";
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
        path: "/exam",
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
        component: LoginPage
    }
].filter(r => !!r && !!r.path && !!r.component);
