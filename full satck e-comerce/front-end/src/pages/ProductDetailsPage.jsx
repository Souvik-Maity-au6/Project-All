import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProductsDetails, addToCart } from '../redux/actions/dataActions'
import { mapToPropsData } from '../redux/mapStateToProps'
import Spinner from '../components/Spinner'
import '../styles/ProductDetailsPage.css'

class ProductDetailsPage extends Component {
    state = {
        size: "",
        color: "",
    }
    componentDidMount() {
        this.props.fetchProductsDetails(this.props.match.params.productId)
    }
    handleChangeSize = event => {
        this.setState({ size: event.target.value })
    }
    handleChangeColor = event => {
        this.setState({ color: event.target.value })
    }
    handleAddToCart = event => {
        event.preventDefault()
        console.log(this.props.match.params.productId)
        if (localStorage.getItem("user")) {
            this.props.addToCart(this.props.match.params.productId)
            window.alert("Product added to cart successfully")
        } else {
            window.alert("Please login first")
        }
    }
    render() {
        return (
            <div className="container">
                {this.props.data.productDetails ?
                    <>
                        <div className="product-details-container">
                            <img src={this.props.data.productDetails.imgUrl} alt="this.props.data.productDetails" width="200" height="200" />
                            <div className="this.props.data.productDetails-details-text">
                                <p><b>Brand : </b> {this.props.data.productDetails.title}</p>
                                <p><b>Category : </b>{this.props.data.productDetails.category}</p>
                                <p><b>Price : </b>{this.props.data.productDetails.price}</p>
                                <p><b>Ratings : </b>{this.props.data.productDetails.ratings}</p>
                                <form onSubmit={this.handleAddToCart}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Sizes</label>
                                        </div>
                                        <select onChange={this.handleChangeSize} className="custom-select" id="inputGroupSelect01" value={this.state.size}>
                                            <option value="" disabled>Choose...</option>
                                            <option value="7">Seven</option>
                                            <option value="8">Eight</option>
                                            <option value="9">Nine</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Colors</label>
                                        </div>
                                        <select onChange={this.handleChangeColor} className="custom-select" id="inputGroupSelect01" value={this.state.color}>
                                            <option value="" disabled>Choose...</option>
                                            <option value="black">Black</option>
                                            <option value="red">Red</option>
                                            <option value="white">White</option>
                                        </select>
                                    </div>
                                    <input className="btn btn-primary btn-lg" type="submit" value="Add to Cart" />
                                </form>
                            </div>
                        </div>
                    </>
                    : <Spinner />}
            </div>
        )
    }
}

export default connect(mapToPropsData, { fetchProductsDetails, addToCart })(ProductDetailsPage)