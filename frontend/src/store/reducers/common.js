import { APP_LOADED, LOADING, LOGIN, LOGOUT } from "../actions";

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
                token: action?.token,
                user: action?.user,
                inProgress: false
            };

        case LOGIN:
            return {
                ...state,
                token: action.token,
                user: action.user,
                inProgress: false
            };

        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null
            };

        default:
            return state;
    }
}
