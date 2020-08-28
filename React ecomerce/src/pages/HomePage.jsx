import React from 'react';
import '../styles/HomePage.css';
import ShoeItems from '../components/ShoeItems';

const HomePage = () => {
    return (
        <div className="home-page-container">
            <div className="banner-container">
                <div className="banner-text">
                    <p>❝The only difference between everybody and nobody is all the shoes❞</p>
                    <span> ― Amor Towles</span>
                </div>
            </div>
            <div className="product-container pt-5">
                <ShoeItems />
            </div>
        </div>
    );
};

export default HomePage;