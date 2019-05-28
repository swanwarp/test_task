import * as types from '../constants/ActionTypes';
import TaskApi from "../api/TaskApi"
import axios from 'axios'

export function getData(sort_field, sort_direction, page) {
    return dispatch => {
        dispatch(isLoading(true));

        TaskApi.getTasks({sort_field, sort_direction, page: page + 1})
            .then(response => {
                dispatch(isLoading(false));

                return response.data.message
            })
            .then(data => dispatch(getSuccess(data, sort_field, sort_direction, page)))
    }
}

export function isLoading(flag) {
    return {
        type: types.IS_LOADING,
        data: {
            flag
        }
    }
}

export function getSuccess(downloaded_data, sort_field, sort_direction, page) {
    return {
        type: types.GET_SUCCESS,
        data: {
            ...downloaded_data,
            sort_field,
            sort_direction,
            page,
        },
    }
}

export function addTask(username, email, text, sort_field, sort_direction, page) {
    return dispatch => {
        dispatch(isLoading(true));

        const data = new FormData();

        data.append("username", username);
        data.append("email", email);
        data.append("text", text);

        TaskApi.postTask(data)
            .then(response => {
                dispatch(isLoading(false));

                if (response.data.status === "error") {
                    let message = [];

                    if (response.data.message.username !== undefined) {
                        message.push("Username: " + response.data.message.username)
                    }

                    if (response.data.message.email !== undefined) {
                        message.push("E-Mail: " + response.data.message.email)
                    }

                    if (response.data.message.text !== undefined) {
                        message.push("Task: " + response.data.message.text)
                    }

                    dispatch(handleError(message))
                } else {
                    dispatch(addingSuccess());
                }

                dispatch(getData(sort_field, sort_direction, page))
            })

    }
}

export function addingSuccess() {
    return {
        type: types.ADDING_SUCCESS,
    }
}

export function editTask(name, email, text) {
    return {
        type: types.EDIT_TASK,
        data: {
            name,
            email,
            text,
        },
    }
}

export function signIn(login, password) {
    return dispatch => {
        dispatch(isLoading(true));

        const data = new FormData();

        data.append("username", login);
        data.append("password", password);

        TaskApi.postLogin(data)
            .then(response => {
                dispatch(isLoading(false));

                if (response.data.status === "error") {
                    let message = [];

                    if (response.data.message.username !== undefined) {
                        message.push("Login: " + response.data.message.username)
                    }

                    if (response.data.message.password !== undefined) {
                        message.push("Password: " + response.data.message.password)
                    }

                    dispatch(handleError(message))
                } else {
                    dispatch(loginSuccess(response.data.message.token));
                }
            })

    }
}

export function loginSuccess(token) {
    return {
        type: types.LOGIN_SUCCESS,
        data: {
            token
        }
    }
}

export function editLogin(login, password) {
    return {
        type: types.EDIT_LOGIN,
        data: {
            login,
            password,
        },
    }
}

export function changeTask(id, status, text) {
    return {
        type: types.CHANGE_TASK,
        data: {
            id,
            status,
            text,
        },
    }
}

export function sendTasks(tasks, token, sort_field, sort_direction, page) {
    const data_list = [];

    for (let i = 0; i < tasks.length; i++) {
        const data = new FormData();

        data.append("id", tasks[i].id);
        data.append("status", tasks[i].status);
        data.append("text", tasks[i].text);
        data.append("token", token);

        data_list.push(data);
    }


    return dispatch => {
        dispatch(isLoading(true));

        axios.all(data_list.map(data => {
            return TaskApi.editTask(data, );
        })).then(responses => {
            dispatch(isLoading(false));

            let errored = false;
            const message = [];

            for (let i = 0; i < responses.length; i++) {
                if (responses[i].data.status === "error") {
                    if (responses[i].data.message.token !== undefined) {
                        message.push("Token: " + responses[i].data.message.token)
                    }

                    errored = true;

                    break
                }
            }

            if (errored) {
                dispatch(handleError(message))
            } else {
                dispatch(getData(sort_field, sort_direction, page))
            }
        });
    }
}

export function closeDialog() {
    return {
        type: types.DIALOG_CLOSE,
    }
}

export function handleError(message) {
    return {
        type: types.ERROR,
        data: {
            message,
        }
    }
}