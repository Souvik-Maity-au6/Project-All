import React, { Component } from "react";
import { connect } from "react-redux";
import { mapToPropsUser } from '../redux/mapStateToProps';
import FavouritePostsCard from "../components/FavouritePostsCard";
import Spinner from '../components/Spinner';


import "../styles/MyPosts.css";

class MyPosts extends Component {
  state = {
    allPosts: []
  };
  handleSetState = (post) => {
    this.setState({ state: this.state.allPosts.push(post) });
  };

  render() {
    return (
      <>
        {this.state.allPosts.length !== this.props.userObj.user.favourites.length && <Spinner />}
        <div className="MyPosts">
          {this.props.userObj.user.favourites.length ? (
            this.props.userObj.user.favourites.map((postId, index) =>
              <>

                <FavouritePostsCard setState={this.handleSetState} key={index} postId={postId} />

              </>
            ))
            : (
              <h1 className="text-center mt-5">You have no post in favourite... add one</h1>
            )}
        </div>
      </>
    );
  }

}

export default connect(mapToPropsUser)(MyPosts);
