import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrderProducts } from '../redux/actions/dataActions'
import { mapToPropsData } from '../redux/mapStateToProps'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import '../styles/OrderPage.css'

class OrderPage extends Component {
    componentDidMount() {
        this.props.fetchOrderProducts()
    }
    render() {
        return (
            <>
                {this.props.data.orders ?
                    <div className="order-container">
                        ({this.props.data.orders.hasOwnProperty("orders") ?
                            this.props.data.orders.orders.map(order => <Card key={order._id} shoe={order.product} />) : <h1 className="text-center">You have no orders pls buy something</h1>})
                    </div>
                    : <Spinner />}
            </>
        )
    }
}

export default connect(mapToPropsData, { fetchOrderProducts })(OrderPage)