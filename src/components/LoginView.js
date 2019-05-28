import {Component} from 'react';
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from './styles';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'

class LoginView extends Component {
    constructor(props) {
        super(props);
    }

    onEditLogin = (field, e) => {
        const login_information = this.props.login_information;

        login_information[field] = e.target.value;

        this.props.editLoginInformation(login_information.login, login_information.password);
    };

    onLoginClick = (e) => {
        e.preventDefault();

        this.props.send_login(this.props.login_information.login, this.props.login_information.password);
    };

    onSubmitChangesClick = (e) => {
        e.preventDefault();

        this.props.submit_tasks(this.props.tasks, this.props.token, this.props.sort_field, this.props.sort_direction, this.props.page)
    };

    renderLogin() {
        return(
            <form style={styles.login} onSubmit={this.onLoginClick.bind(null)}>
                <TextField
                    name="login"
                    style={styles.formField}
                    value={this.props.login_information.login}
                    onChange={this.onEditLogin.bind(null, 'login')}
                    hintText="Login"
                />
                <TextField
                    name="password"
                    style={styles.formField}
                    value={this.props.login_information.password}
                    onChange={this.onEditLogin.bind(null, 'password')}
                    hintText="Password"
                />
                <RaisedButton
                    label="Sign In"
                    labelPosition="before"
                    disabled={this.props.is_loading}
                    primary={true}
                    type="submit"
                    style={styles.loginButton}
                />
            </form>
        );
    }

    renderLogged() {
        return (
            <form style={styles.login} onSubmit={this.onSubmitChangesClick.bind(null)}>
                <TextField
                    name="login"
                    style={styles.formField}
                    value={"You are logged in!"}
                    hintText="Login"
                    disabled={true}
                />
                <RaisedButton
                    label="Submit Changes"
                    labelPosition="before"
                    disabled={this.props.is_loading}
                    primary={true}
                    type="submit"
                    style={styles.submitButton}
                />
            </form>
        )
    }

    render() {
        const logged = this.props.logged;

        return(
            <div>
                {logged ? this.renderLogged() : this.renderLogin()}
            </div>
        )
    }
}

LoginView.propTypes = {
    tasks: PropTypes.array.isRequired,
    sort_field: PropTypes.string.isRequired,
    sort_direction: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    logged: PropTypes.bool.isRequired,
    is_loading: PropTypes.bool.isRequired,
    login_information: PropTypes.object.isRequired,
    editLoginInformation: PropTypes.func.isRequired,
    send_login: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    submit_tasks: PropTypes.func.isRequired,
};

export default LoginView;