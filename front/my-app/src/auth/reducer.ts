import { AuthActions } from './action';
import { AuthState } from './state';

const initialState: AuthState = {
    // email: null,
    // username: null,
    loggedIn: null,
    token: null,
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case '@@auth/LOGGED_IN':
            return {
                ...state,
                // email: action.email,
                // username: action.username,
                token: action.token,
                loggedIn: true
            };
        case '@@auth/LOGGED_OUT':
            return {
                ...state,
                // email: null,
                // username: null,
                token: null,
                loggedIn: false,
            };
        default:
            return state;
    }
}