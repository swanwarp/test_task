import {connect} from "react-redux";
import TaskListView from "../components/TaskListView";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {addTask, changeTask, closeDialog, editLogin, editTask, getData, sendTasks, signIn} from "../actions/Actions";
import LoginView from "../components/LoginView";
import NewTaskView from "../components/NewTaskView";
import ErrorDialogView from "../components/ErrorDialogView";


class TodoListContainer extends React.Component {
    render() {
        return(
            <MuiThemeProvider>
                <div>
                    <LoginView {...this.props}/>
                    <TaskListView {...this.props}/>
                    <NewTaskView {...this.props}/>
                    <ErrorDialogView {...this.props}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = store => {
    return {
        tasks: store.tasks,
        sort_field: store.sort_field,
        sort_direction: store.sort_direction,
        page: store.page,
        logged: store.logged,
        total_task_count: store.total_task_count,
        new_task: store.new_task,
        is_loading: store.is_loading,
        login_information: store.login_information,
        token: store.token,
        error_information: store.error_information,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addTask: (username, email, text, sort_field, sort_direction, page) => dispatch(addTask(username, email, text, sort_field, sort_direction, page)),
        editNewTask: (username, email, text) => dispatch(editTask(username, email, text)),
        editLoginInformation: (login, password) => dispatch(editLogin(login, password)),
        fetch_data: (sort_field, sort_direction, page) => dispatch(getData(sort_field, sort_direction, page)),
        send_login: (login, password) => dispatch(signIn(login, password)),
        editOldTask: (id, status, text) => dispatch(changeTask(id, status, text)),
        submit_tasks: (tasks, token, sort_field, sort_direction, page) => dispatch(sendTasks(tasks, token, sort_field, sort_direction, page)),
        closeDialog: () => dispatch(closeDialog())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer)