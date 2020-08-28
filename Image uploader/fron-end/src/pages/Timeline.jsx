import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllPublicPost, addToFavoriteList } from '../redux/actions/dataActions';

import Card from "../components/Card";
import Spinner from '../components/Spinner';
import '../styles/Timeline.css';



class Timeline extends Component {

  componentDidMount() {
    this.props.fetchAllPublicPost();
  }
  handleClick = (event) => {
    if (this.props.userObj.user) {
      this.props.addToFavoriteList(event.target.value);
      window.alert("Sucessfully added to fovourite");
    } else {
      window.alert("Please Login first");
    }

  };
  render() {
    return (
      <div className="Timeline">
        {this.props.data.publicPosts ? (
          this.props.data.publicPosts.allPublicPosts.map(post => (
            <div key={post.id} className="card my-5 mx-3"
              style={{ width: "18rem" }}>
              <Card post={post} />
              <button onClick={this.handleClick} className="btn btn-primary" value={post.id}>Add to favourites</button>
            </div>
          ))
        ) : (
            <Spinner />
          )}
      </div>
    );
  }
}

const mergeStateToProps = reduxStore => {
  return {
    userObj: { ...reduxStore.userState },
    data: { ...reduxStore.dataState },
  };
};


export default connect(mergeStateToProps, { fetchAllPublicPost, addToFavoriteList })(Timeline);
