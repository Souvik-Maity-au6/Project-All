import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import '../styles/FinishPage.css';

const FinishPage = ({ user }) => {
    return user.length && user[0].isLoggedIn === true ? (
        <div className="finish-page-container">
            <h1 className="message-container">Thank you for shopping.....visit again</h1>
        </div>) : <Redirect to="/login" />;
};


const mapStateToProps = (storeState, ownState) => {
    return {
        user: storeState.userState.user
    };
};


export default connect(mapStateToProps)(FinishPage);
