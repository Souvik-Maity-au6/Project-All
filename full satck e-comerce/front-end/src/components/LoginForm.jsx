import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { userLogin } from '../redux/actions/userActions';

const initialState = {
    email: "",
    password: "",
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    handleChangeLogin = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmitLogin = (event) => {
        event.preventDefault();
        this.props.userLogin(this.state)
        this.setState(initialState)
        window.alert("login successful")
        this.props.history.push("/")
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmitLogin}>
                    <div className="form-group">
                        <label htmlFor="u-email">Email address</label>
                        <input onChange={this.handleChangeLogin} type="email" name="email" className="form-control" id="u-email" aria-describedby="emailHelp" value={this.state.email} required={true} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pswd">Password</label>
                        <input onChange={this.handleChangeLogin} type="password" name="password" className="form-control" id="pswd" value={this.state.password} required={true} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
        );
    }
};


export default connect(null, { userLogin })(withRouter(LoginForm));
