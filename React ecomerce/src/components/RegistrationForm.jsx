import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { registerUser } from '../redux/actions/userActions';

const initialState = {
    user_id: "",
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
    nameError: "",
    emailError: "",
    passwordError: "",
};

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    handleChangeRegister = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        if (!(validator.matches(this.state.name, /^[A-Za-z\s][A-Za-z\s]{0,}$/gm) && this.state.name.length > 3)) {
            nameError = "Please Enter a correct name!!!";
        }
        if (nameError) {
            this.setState({ nameError });
            return false;
        }
        if (!validator.isEmail(this.state.email)) {
            emailError = "Please Enter a correct email!!!";
        }
        if (emailError) {
            this.setState({ emailError });
            return false;
        }
        if (!validator.matches(this.state.password, /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/gm)) {
            passwordError = "Please Enter a correct password!!!";
        }
        if (passwordError) {
            this.setState({ passwordError });
            return false;
        }
        return true;
    };
    handleSubmitRegister = event => {
        event.preventDefault();
        const userObj = {
            user_id: (Math.round(Math.random() * 10)).toString(),
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isLoggedIn: this.state.isLoggedIn,
        };
        const isValid = this.validate();
        if (isValid) {
            // console.log(this.props.history);
            this.props.userRegistration(userObj);
            this.setState(initialState);
            this.props.history.push("/login");
        }
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


const mapDispatchToProps = (dispatch) => {
    return {
        userRegistration: user => dispatch(registerUser(user))
    };
};

const mapStateToProps = (storeState, ownState) => {
    return {
        user: storeState.userState.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationForm));