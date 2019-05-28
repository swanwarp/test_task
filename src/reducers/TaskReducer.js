import * as types from '../constants/ActionTypes';

export const initialState = {
    tasks: [],
    sort_field: 'id',
    sort_direction: 'asc',
    page: 0,
    logged: false,
    total_task_count: 0,
    new_task: {name: '', email: '', text: '',},
    login_information: {login: '', password: '',},
    is_loading: false,
    token: '',
    error_information: {message: [], errored: false},
};

export function TaskReducer(state=initialState, action) {
    switch (action.type) {
        case types.IS_LOADING:
            return {
                ...state,
                is_loading: action.data.flag,
            };

        case types.GET_SUCCESS:
            return {
                ...state,
                tasks: action.data.tasks,
                total_task_count: +action.data.total_task_count,
                page: action.data.page,
                sort_field: action.data.sort_field,
                sort_direction: action.data.sort_direction,
            };

        case types.ADDING_SUCCESS:
            return {
                ...state,
                new_task: {name: '', email: '', text: '',},
            };

        case types.EDIT_TASK:
            return {
                ...state,
                new_task: action.data,
            };

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                login_information: {login: '', password: '', },
                token: action.data.token,
                logged: true,
            };

        case types.EDIT_LOGIN:
            return {
                ...state,
                login_information: action.data,
            };

        case types.CHANGE_TASK:
            const new_tasks = [];

            for (let i = 0; i < state.tasks.length; i++) {
                new_tasks.push(state.tasks[i]);

                if (new_tasks[i].id === action.data.id) {
                    new_tasks[i].status = +action.data.status;
                    new_tasks[i].text = action.data.text;
                }
            }

            return {
                ...state,
                tasks: new_tasks,
            };

        case types.DIALOG_CLOSE:
            return {
                ...state,
                error_information: {
                    message: '',
                    errored: false,
                },
            };

        case types.ERROR:
            return {
                ...state,
                error_information: {
                    message: action.data.message,
                    errored: true,
                },
            };

        default:
            return state;
    }
}