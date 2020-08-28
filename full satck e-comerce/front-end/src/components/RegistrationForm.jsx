import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { userRegistration } from '../redux/actions/userActions';

const initialState = {
    name: "",
    email: "",
    password: "",
};

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    handleChangeRegister = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmitRegister = event => {
        event.preventDefault()
        this.props.userRegistration(this.state);
        this.setState(initialState);
        window.alert("Registration Successful")
        this.props.history.push("/login");

    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmitRegister}>
                    <div className="form-group">
                        <label htmlFor="f-name">Full Name</label>
                        <input onChange={this.handleChangeRegister} type="text" name="name" className="form-control" id="f-name" aria-describedby="emailHelp" value={this.state.name} placeholder="Enter your full name" required={true} />
                        <div className="error-message">
                            <p>{this.state.nameError}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="u-email">Email address</label>
                        <input type="email" name="email" onChange={this.handleChangeRegister} className="form-control" id="u-email" aria-describedby="emailHelp" value={this.state.email} placeholder="Enter your email" required={true} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        <div className="error-message">
                            <p>{this.state.emailError}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pswd">Password</label>
                        <input onChange={this.handleChangeRegister} type="password" name="password" className="form-control" id="pswd" value={this.state.password} placeholder="Enter a 8 digit password" required={true} />
                        <div className="error-message">
                            <p>{this.state.passwordError}</p>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
        );
    }
}


export default connect(null, { userRegistration })(withRouter(RegistrationForm));