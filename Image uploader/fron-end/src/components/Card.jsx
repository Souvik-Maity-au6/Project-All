import React from "react";
import "../styles/Card.css";


function Card({ post }) {

  return (
    <>
      <img className="card-img-top" src={post.image} alt="Card img cap" height="300" width="100%" />
      <div className="card-body">
        <h5 className="card-title">Title : {post.imagetitle}</h5>
        <p className="card-text">Description : {post.description}</p>
      </div>
    </>
  );
}

export default Card;
