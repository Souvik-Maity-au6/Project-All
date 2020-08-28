import React, { Component } from 'react';
import { connect } from "react-redux";
import { removeFromCart, fetchAllCartProducts } from '../redux/actions/dataActions'


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.initialState.quantity
        };
    }
    shoe = this.props.shoe;
    // selectedQuantity = this.props.cartStore.find(cart => {
    //     // console.log(cart);
    //     return cart.product_id === this.shoe.cart.product_id;
    // });
    initialState = {
        quantity: 1
    };

    handleChangeQuantity = (event) => {
        let shoeId = this.shoe.cart.product_id;
        let quantity = event.target.value;
        // this.setState({ quantity: event.target.value });
        // this.props.propsQuantityChange(shoeId, quantity);
        // console.log(quantity);
    };
    handleRemove = (event) => {
        let productId = event.target.value;
        this.props.removeFromCart(productId)
        window.alert("Product has been removed from cart")
        this.props.fetchAllCartProducts()
    };
    render() {
        // console.log(this.shoe)
        return (
            <>
                <tr>
                    <th scope="row">{this.shoe.index + 1}</th>
                    <td><figure>
                        <img src={this.shoe.cart.product.imgUrl} alt="this.shoe" style={{ height: "100px", width: "100px", borderRadius: "50%" }} />
                        <figcaption className="mt-2"><b>Brand: {this.shoe.cart.product.title}</b></figcaption>
                        <p><b>category: {this.shoe.cart.product.category}</b></p>
                    </figure></td>
                    <td><label htmlFor="quantity"><b>Quantity (max: 5) :</b></label>
                        <input onChange={this.handleChangeQuantity} type="number" className="ml-3" id="quantity" style={{ padding: "5px" }} name="quantity" min="1" max="5" value={this.state.quantity} />
                        <button onClick={this.handleRemove} type="submit" className="btn btn-danger mx-5" value={this.shoe.cart.product._id}>Remove from cart</button>
                    </td>
                    <td><b>price: {this.shoe.cart.product.price}</b></td>
                </tr>
            </>
        );
    }
}


export default connect(null, { removeFromCart, fetchAllCartProducts })(Table);
