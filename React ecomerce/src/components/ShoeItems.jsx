import React from 'react';
import { connect } from "react-redux";
import Card from './Card';


const ShoeItems = (props) => {
    // console.log(props);
    return (
        <div className="card-columns item-container mx-5">
            {props.shoeDetails.map(shoe => <Card key={shoe.product_id} shoe={shoe} />)}
        </div>
    );
};


const mapStateToProps = (storeState, ownState) => {
    return {
        shoeDetails: storeState.shopingState.shoeDetails,
    };
};

export default connect(mapStateToProps)(ShoeItems);
