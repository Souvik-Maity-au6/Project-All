import React from 'react';
import Card from './Card';


const ShoeItems = ({ shoeDetails }) => {
    // console.log(props);
    return (
        <div className="card-columns item-container mx-5">
            {shoeDetails.map(shoe => <Card key={shoe._id} shoe={shoe} />)}
        </div>
    );
};


export default ShoeItems;
