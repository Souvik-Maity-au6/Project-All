import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCartProducts, checkoutCart } from '../redux/actions/dataActions'
import { mapToPropsData } from '../redux/mapStateToProps'
import Spinner from './Spinner'
import Table from './Table';

class cartItem extends Component {

    componentDidMount() {
        this.props.fetchAllCartProducts()
    }
    render() {
        return (
            <>
                {
                    this.props.data.cartProducts ? (
                        this.props.data.cartProducts.length ? <div className="row">
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
                                    {this.props.data.cartProducts.map((cart, index) => <Table key={cart.product._id} shoe={{ cart, index }} />)}
                                </tbody>
                            </table>
                            <div className="col-4 mt-5 pr-5">
                                <Link to="/finish" className="float-right"><button onClick={() => { this.props.checkoutCart() }} type="submit" className="btn btn-success">Checkout</button></Link>
                            </div>
                        </div> : <div className="empty-message"><h1>Your cart is empty... add something</h1></div>
                    ) : <Spinner />
                }
            </>
        );
    }
};


export default connect(mapToPropsData, { fetchAllCartProducts, checkoutCart })(cartItem);





