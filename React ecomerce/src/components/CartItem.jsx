import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from './Table';
import { checkoutCart } from '../redux/actions/shopingActions';

const cartItem = ({ cartStore, checkout }) => {
    let amount = 0;
    cartStore.map(cart => amount += parseFloat((parseFloat(cart.price) * parseFloat(cart.quantity))));
    // console.log(singleAmount.toFixed(2));
    const paymentAmount = ((amount * 0.25) + 100).toFixed(2);

    return (
        <>
            {
                cartStore.length ? (
                    <>
                        <table className="table table-dark col-7 ml-5 mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">S.NO</th>
                                    <th scope="col">Shoe</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartStore.map((cart, index) => <Table key={cart.product_id} order={{ cart, index }} />)}
                            </tbody>
                        </table>
                        <div className="col-4 pl-3 mt-5">
                            <h2>Total Amount : ${amount.toFixed(2)} </h2>
                            <h3>Discount : 25% </h3>
                            <h3>Shipping Cost: $100 </h3>
                            <hr style={{ border: "2px solid black" }} />
                            <h3>Payment amount: ${paymentAmount} </h3>
                            <Link to="/finish" className="float-right"><button onClick={() => checkout()} type="submit" className="btn btn-success">Checkout</button></Link>
                        </div>
                    </>
                ) : <div className="empty-message"><h1>Your cart is empty... buy something</h1></div>
            }
        </>
    );
};

const mapStateToProps = (storeState, ownState) => {
    return {
        cartStore: [...storeState.shopingState.cartDetails]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkout: () => dispatch(checkoutCart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(cartItem);





