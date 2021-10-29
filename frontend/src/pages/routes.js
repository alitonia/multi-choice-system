import {Placeholder} from './Placeholder.js'
import {HomePage} from "./Home/HomePage.js";

export const routes = [
    {
        path: '/home',
        others: {},
        component: HomePage
    },
    {
        path: '/',
        others: {},
        component: Placeholder
    }
].filter(r => !!r && !!r.path && !!r.component);
