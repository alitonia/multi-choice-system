import { APP_LOADED, LOADING, LOGIN, LOGOUT, REDIRECT } from "../action";

const inititalState = {
    inProgress: false
};

export default function commonReducer(state = inititalState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, inProgress: true };

        case APP_LOADED:
            return {
                ...state,
                redirectTo: !action.token ? "/login" : null,
                user: action.user,
                inProgress: false
            };

        case LOGIN:
            return {
                ...state,
                redirectTo: "/dashboard",
                token: action.token,
                user: action.user,
                inProgress: false
            };

        case LOGOUT:
            return {
                ...state,
                redirectTo: "/login",
                token: null,
                user: null
            };

        case REDIRECT:
            return { ...state, redirectTo: null };

        default:
            return state;
    }
}
