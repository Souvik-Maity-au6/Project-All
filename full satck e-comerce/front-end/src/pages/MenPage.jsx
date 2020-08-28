import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShoeItems from '../components/ShoeItems';
import { mapToPropsData } from '../redux/mapStateToProps'
import { fetchAllProducts } from '../redux/actions/dataActions'
import Spinner from '../components/Spinner'
import '../styles/HomePage.css';

class MenPage extends Component {
    componentDidMount() {
        this.props.fetchAllProducts("Men")
    }
    render() {
        return (
            <div className="product-container pt-5">
                {this.props.data.products ? <ShoeItems shoeDetails={this.props.data.products} /> : <Spinner />}
            </div>
        )
    }
}

export default connect(mapToPropsData, { fetchAllProducts })(MenPage)