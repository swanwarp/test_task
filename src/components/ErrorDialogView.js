import {Component} from 'react';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class ErrorDialogView extends Component {
    constructor(props) {
        super(props);
    }

    onClose = (e) => {
        e.preventDefault();

        this.props.closeDialog();
    };

    renderMessages() {
        const result = [];

        for(let i = 0; i < this.props.error_information.message.length; i++) {
            result.push(
                <p key={this.props.error_information.message[i]}>
                    {this.props.error_information.message[i]}
                </p>
            )
        }

        return result;
    }

    render() {
        return(
            <div>
                <Dialog
                    open={this.props.error_information.errored}
                >
                    <DialogTitle>{"Error"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.renderMessages()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <RaisedButton
                            label="Close"
                            labelPosition="before"
                            disabled={false}
                            primary={true}
                            type="submit"
                            onClick={this.onClose.bind(null)}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

ErrorDialogView.propTypes = {
    error_information: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
};

export default ErrorDialogView;