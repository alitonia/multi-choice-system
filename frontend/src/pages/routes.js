import { Placeholder } from "./Placeholder.js";
import { HomePage } from "./Home/HomePage.js";
import LoginPage from "./LoginPage";

export const routes = [
    {
        path: "/home",
        others: {},
        component: HomePage
    },
    {
        path: "/login",
        others: {},
        component: LoginPage
    },

    {
        path: "/",
        others: {},
        component: Placeholder
    }
].filter(r => !!r && !!r.path && !!r.component);
