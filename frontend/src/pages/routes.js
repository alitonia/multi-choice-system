import { Placeholder } from "./Placeholder.js";
import Dashboard from "./Dashboard";

export const routes = [
    {
        path: "/dashboard",
        others: {},
        component: Dashboard
    },
    {
        path: "/",
        others: {},
        component: Placeholder
    }
].filter(r => !!r && !!r.path && !!r.component);
