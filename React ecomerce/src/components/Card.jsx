import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addToCart } from '../redux/actions/shopingActions';

const Card = ({ shoe, propsAddToCart, user, history }) => {

    const handleAddToCart = (event) => {
        let shoeId = event.target.value;
        if (user.length && user[0].isLoggedIn === true) {
            propsAddToCart(shoeId);
            window.alert("Successfully added to cart...");
        } else {
            history.push("/login");
        }

    };
    return (
        <>
            <div className="card card-container mx-4 mb-5 text-center" style={{ width: "18rem" }}>
                <img src={shoe.imgUrl} className="card-img-top" alt="shoe" style={{ height: "200px" }} />
                <div className="card-body">
                    <h5 className="card-title">Brand: {shoe.title}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Category: {shoe.category}</li>
                    <li className="list-group-item">Price: ${shoe.price}</li>
                    <li className="list-group-item">Ratings: {shoe.ratings}</li>
                </ul>
                <div className="card-footer">
                    <button onClick={handleAddToCart} className="btn btn-primary btn-lg my-2 my-sm-0" type="submit" value={shoe.product_id}>
                        Add to cart
				</button>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (storeState, ownState) => {
    return {
        user: storeState.userState.user
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        propsAddToCart: shoeId => dispatch(addToCart(shoeId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card));
