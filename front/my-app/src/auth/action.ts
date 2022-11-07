import { AppDispatch } from "../store";
import axios, { AxiosResponse } from 'axios';

export function loggedIn(token: string) {

    return {
        type: '@@auth/LOGGED_IN' as const,
        token: token,
    }
}

export function loggedOut() {
    return {
        type: '@@auth/LOGGED_OUT' as const,
    }
}

export type LoggedInAction = ReturnType<typeof loggedIn>;
export type LoggedOutAction = ReturnType<typeof loggedOut>;

export type AuthActions = LoggedInAction | LoggedOutAction;

export function checkResponse(res: AxiosResponse) {
    return (dispatch: AppDispatch) => {
        if (res.headers['temp-token'] != null) {
            dispatch(login(res.headers['temp-token']))
        }
    }
}

export function login(token: string) {
    return (dispatch: AppDispatch) => {
        localStorage.setItem('token', token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        dispatch(loggedIn(token));
    }
}

export function logout() {
    return async (dispatch: AppDispatch) => {
        localStorage.removeItem('token');

        delete axios.defaults.headers.common['Authorization'];

        dispatch(loggedOut());
    }
}