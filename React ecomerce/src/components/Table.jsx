import React, { Component } from 'react';
import { connect } from "react-redux";
import { removeFromCart, quantityChange } from '../redux/actions/shopingActions';


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.initialState.quantity
        };
    }
    shoe = this.props.order;
    selectedQuantity = this.props.cartStore.find(cart => {
        // console.log(cart);
        return cart.product_id === this.shoe.cart.product_id;
    });
    initialState = {
        quantity: this.selectedQuantity.quantity
    };

    handleChangeQuantity = (event) => {
        let shoeId = this.shoe.cart.product_id;
        let quantity = event.target.value;
        this.setState({ quantity: event.target.value });
        this.props.propsQuantityChange(shoeId, quantity);
        // console.log(quantity);
    };
    handleRemove = (event) => {
        let shoeId = event.target.value;
        this.props.propsRemoveFromCart(shoeId);
    };




    render() {
        return (
            <>
                <tr>
                    <th scope="row">{this.shoe.index + 1}</th>
                    <td><figure>
                        <img src={this.shoe.cart.imgUrl} alt="this.shoe" style={{ height: "100px", width: "100px", borderRadius: "50%" }} />
                        <figcaption className="mt-2"><b>Brand: {this.shoe.cart.title}</b></figcaption>
                        <p><b>category: {this.shoe.cart.category}</b></p>
                    </figure></td>
                    <td><label htmlFor="quantity"><b>Quantity (max: 5) :</b></label>
                        <input onChange={this.handleChangeQuantity} type="number" className="ml-3" id="quantity" style={{ padding: "5px" }} name="quantity" min="1" max="5" value={this.state.quantity} />
                        <button onClick={this.handleRemove} type="submit" className="btn btn-danger mx-5" value={this.shoe.cart.product_id}>Remove from cart</button>
                    </td>
                    <td><b>price: ${((parseFloat(this.shoe.cart.price) * parseFloat(this.state.quantity)).toFixed(2)).toString()}</b></td>
                </tr>
            </>
        );
    }
}

const mapStateToProps = (storeState, ownState) => {
    return {
        cartStore: storeState.shopingState.cartDetails
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        propsRemoveFromCart: shoeId => dispatch(removeFromCart(shoeId)),
        propsQuantityChange: (shoeId, quantity) => dispatch(quantityChange(shoeId, quantity))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
