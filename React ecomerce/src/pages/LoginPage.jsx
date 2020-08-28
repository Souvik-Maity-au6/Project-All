import React from 'react';
import { Link } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

const LoginPage = ({ user }) => {
    // console.log(props);
    return (
        <div className="page-container container mt-3">
            <div className="form-container">
                <LoginForm />
            </div>
            <div className="registratin-container">
                <p>Don't have an account create one </p>
                <Link to="/registration">
                    <button className="btn btn-outline-success my-2 my-sm-0 px-5" type="submit">
                        Register
				</button>
                </Link>
            </div>
        </div>
    );
};




export default LoginPage;
