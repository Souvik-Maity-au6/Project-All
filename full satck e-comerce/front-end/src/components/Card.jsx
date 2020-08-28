import React from 'react';
import { withRouter } from "react-router-dom";


const Card = ({ shoe, user, history }) => {

    const handleShowDetails = (event) => {
        let productId = event.target.value;
        console.log(productId)
        history.push(`/productDetails/${productId}`)
    }
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
                    <button onClick={handleShowDetails} className="btn btn-primary btn-lg my-2 my-sm-0" type="submit" value={shoe._id}>
                        Show details
				</button>
                </div>
            </div>
        </>
    );
};


export default withRouter(Card);
