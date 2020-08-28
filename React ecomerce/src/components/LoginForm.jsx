import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { loginUser } from '../redux/actions/userActions';

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
        const { email, password } = this.state;
        let currentUser = null;
        this.props.user !== null ? currentUser = this.props.user.find(u => u.email === email && u.password === password) : currentUser = null;
        currentUser ? this.props.userLoggedIn(currentUser.user_id) : window.alert("Invalid credential..please give correct information");
        // console.log(this.props);
        this.setState(initialState);

        this.props.history.push('/');
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

const mapStateToProps = (storeState, ownState) => {
    return {
        user: storeState.userState.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLoggedIn: userId => dispatch(loginUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
