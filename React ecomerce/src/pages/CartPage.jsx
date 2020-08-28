import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import CartItem from '../components/CartItem';
import '../styles/CartPage.css';

const CartPage = ({ user }) => {
    return user.length && user[0].isLoggedIn === true ? (
        <div className="cart-page-container row">
            <CartItem />
        </div>) : <Redirect to="/login" />;
};

const mapStateToProps = (storeState, ownState) => {
    return {
        user: storeState.userState.user
    };
};


export default connect(mapStateToProps)(CartPage);
