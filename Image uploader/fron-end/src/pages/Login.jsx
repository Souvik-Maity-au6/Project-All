import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userLogin } from '../redux/actions/userActions';


const initialState = {
  useremail: "",
  password: "",
};

class Login extends Component {
  state = initialState;

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);
    this.props.userLogin(this.state);
    this.setState({ initialState });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="Login col-md-6 mx-auto mt-5 ">
        <h1 className="text-center">Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={this.handleChange}
              type="email"
              name="useremail"
              value={this.state.useremail}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={this.state.password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
        </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { userLogin })(withRouter(Login));
