import React, { Component } from 'react';
import { connect } from 'react-redux'
import ShoeItems from '../components/ShoeItems';
import { fetchAllProducts, fetchAllCartProducts } from '../redux/actions/dataActions'
import Spinner from '../components/Spinner'
import '../styles/HomePage.css';
class HomePage extends Component {
    componentDidMount() {
        this.props.fetchAllProducts()
        if (this.props.userObj.user) {
            this.props.fetchAllCartProducts()
        }

    }
    render() {
        return (
            <div className="home-page-container">
                <div className="banner-container">
                    <div className="banner-text">
                        <p>❝The only difference between everybody and nobody is all the shoes❞</p>
                        <span> ― Amor Towles</span>
                    </div>
                </div>
                <div className="product-container pt-5">
                    {this.props.data.products ? <ShoeItems shoeDetails={this.props.data.products} /> : <Spinner />}
                </div>
            </div>
        );
    }
};

const mergeStateToProps = (reduxStore) => {

    return {
        userObj: { ...reduxStore.userState },
        data: { ...reduxStore.dataState },
    }
}

export default connect(mergeStateToProps, { fetchAllProducts, fetchAllCartProducts })(HomePage);