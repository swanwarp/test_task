import {Component} from 'react';
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles';
import TablePagination from '@material-ui/core/TablePagination/index'
import TableRow from "@material-ui/core/TableRow/index";
import Table from "@material-ui/core/Table/index";
import TableHead from "@material-ui/core/TableHead/index";
import TableBody from "@material-ui/core/TableBody/index";
import TableCell from "@material-ui/core/TableCell/index";
import PropTypes from 'prop-types'
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


class TaskListView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetch_data(this.props.sort_field, this.props.sort_direction, this.props.page);
    }

    onChangeOldTask = (id, field, e) => {
        e.preventDefault();

        const to_edit = {
            status: '',
            text: '',
        };

        for (let i = 0; i < this.props.tasks.length; i++) {
            if (this.props.tasks[i].id === id) {
                to_edit.text = this.props.tasks[i].text;
                to_edit.status = this.props.tasks[i].status;

                break
            }
        }

        to_edit[field] = e.target.value;

        this.props.editOldTask(id, to_edit.status, to_edit.text);
    };

    onChangePage = (page, e) => {
        e.preventDefault();

        this.props.fetch_data(this.props.sort_field, this.props.sort_direction, page);
    };

    onSortClick = (field, e) => {
        let sort_direction = this.props.sort_direction;

        if (field === this.props.sort_field) {
            sort_direction = sort_direction === "asc" ? "desc" : "asc";
        } else {
            sort_direction = "asc";
        }

        this.props.fetch_data(field, sort_direction, this.props.page);
    };

    renderTablePaginationActions(props) {
        const {page, onChangePage, count} = props;

        function handleBackButtonClick(event) {
            onChangePage(page - 1, event);
        }

        function handleNextButtonClick(event) {
            onChangePage(page + 1, event);
        }

        return (
            <div>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    style={{float: "left"}}
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / 3) - 1}
                >
                    <KeyboardArrowRight />
                </IconButton>
            </div>
        );
    }

    renderColumns() {
        const rows = [];

        for(let i = 0; i < this.props.tasks.length; i++) {
            const task = this.props.tasks[i];

            rows.push(
                    <TableRow key={task.id} style={{backgroundColor: task.status === 10 ? 'lightgreen' : ''}}>
                        <TableCell>
                            <TextField
                                id={task.id + " status"}
                                underlineShow={false}
                                fullWidth={true}
                                name="status"
                                style={styles.textField}
                                value={task.status}
                                disabled={!this.props.logged || this.props.is_loading}
                                onChange={this.onChangeOldTask.bind(null, task.id, "status")}
                        />
                        </TableCell>
                        <TableCell>
                            <TextField
                                id={task.id + " name"}
                                underlineShow={false}
                                fullWidth={true}
                                name="name"
                                style={styles.textField}
                                value={task.username}
                                disabled={true}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                id={task.id + " mail"}
                                underlineShow={false}
                                fullWidth={true}
                                name="mail"
                                style={styles.textField}
                                value={task.email}
                                disabled={true}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                id={task.id + " text"}
                                underlineShow={false}
                                fullWidth={true}
                                name="text"
                                style={styles.taskField}
                                value={task.text}
                                disabled={!this.props.logged || this.props.is_loading}
                                onChange={this.onChangeOldTask.bind(null, task.id, "text")}
                            />
                        </TableCell>
                    </TableRow>
                )
        }

        return(rows);
    }

    renderTable() {
        return(
            <Table style={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell style={styles.textField} onClick={this.onSortClick.bind(null, "status")}>Status</TableCell>
                        <TableCell style={styles.textField} onClick={this.onSortClick.bind(null, "username")}>Username</TableCell>
                        <TableCell style={styles.textField} onClick={this.onSortClick.bind(null, "email")}>e-Mail</TableCell>
                        <TableCell style={styles.taskField}>Task</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody style={styles.table}>
                    {this.renderColumns()}
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[3]}
                            colSpan={4}
                            count={this.props.total_task_count}
                            rowsPerPage={3}
                            page={this.props.page}
                            SelectProps={{
                                native: true,
                            }}
                            onChangePage={this.onChangePage}
                            ActionsComponent={this.renderTablePaginationActions}
                        />
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    render() {
        return(
            <div>
                {this.renderTable()}
            </div>
        )
    }
}

TaskListView.propTypes = {
    tasks: PropTypes.array.isRequired,
    sort_field: PropTypes.string.isRequired,
    sort_direction: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    logged: PropTypes.bool.isRequired,
    total_task_count: PropTypes.number.isRequired,
    fetch_data: PropTypes.func.isRequired,
    is_loading: PropTypes.bool.isRequired,
};

export default TaskListView;