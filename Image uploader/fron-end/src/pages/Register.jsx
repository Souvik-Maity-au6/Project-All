import React, { Component } from "react";
import { connect } from "react-redux";
import { userRegistration } from '../redux/actions/userActions';
import "../styles/App.css";

const initialState = {
  username: "",
  useremail: "",
  password: "",
};



class Register extends Component {
  state = initialState;

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.userRegistration(this.state);
    this.props.history.push("/login");
  };
  render() {
    return (
      <div className="Register col-md-6 mx-auto mt-5 ">
        <h1 className="text-center">Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputUser">User Name</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="username"
              value={this.state.username}
              className="form-control"
              id="exampleInputUser"
              aria-describedby="emailHelp"
              placeholder="Enter username"
            />
          </div>
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
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  }

}

export default connect(null, { userRegistration })(Register);
