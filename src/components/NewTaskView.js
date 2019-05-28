import {Component} from 'react';
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from "prop-types";


class NewTaskView extends Component {
    constructor(props) {
        super(props);
    }

    onAddTask = e => {
        e.preventDefault();
        this.props.addTask(this.props.new_task.name, this.props.new_task.email, this.props.new_task.text,
            this.props.sort_field, this.props.sort_direction, this.props.page);
    };

    onChangeNewTask = (field, e) => {
        const new_task = this.props.new_task;

        new_task[field] = e.target.value;

        this.props.editNewTask(new_task.name, new_task.email, new_task.text)
    };

    renderNewTask() {
        return(
            <form style={styles.login} onSubmit={this.onAddTask.bind(null)}>
                <TextField
                    name="new_name"
                    style={styles.formField}
                    value={this.props.new_task.name}
                    onChange={this.onChangeNewTask.bind(null, 'name')}
                    hintText="Username"
                />
                <TextField
                    name="new_email"
                    style={styles.formField}
                    value={this.props.new_task.email}
                    onChange={this.onChangeNewTask.bind(null, 'email')}
                    hintText="E-Mail"
                />
                <TextField
                    name="new_task"
                    style={styles.formField}
                    value={this.props.new_task.text}
                    onChange={this.onChangeNewTask.bind(null, 'text')}
                    hintText="Task"
                />
                <RaisedButton
                    label="Add New Task"
                    labelPosition="before"
                    disabled={this.props.is_loading}
                    primary={true}
                    type="submit"
                    style={styles.newTaskButton}
                />
            </form>
        );
    }

    render() {
        return(
            <div>
                {this.renderNewTask()}
            </div>
        )
    }
}

NewTaskView.propTypes = {
    sort_field: PropTypes.string.isRequired,
    sort_direction: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    addTask: PropTypes.func.isRequired,
    editNewTask: PropTypes.func.isRequired,
    new_task: PropTypes.object.isRequired,
    fetch_data: PropTypes.func.isRequired,
    is_loading: PropTypes.bool.isRequired,
};

export default NewTaskView;