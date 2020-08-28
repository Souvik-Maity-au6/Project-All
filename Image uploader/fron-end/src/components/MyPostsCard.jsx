import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import keys from "../config";
import { mapToPropsUser } from '../redux/mapStateToProps';
import "../styles/Card.css";

class MyPostsCard extends Component {
    state = {
        post: null,
    };
    async componentDidMount() {
        const accessToken = this.props.userObj.user.token;
        try {
            const response = await axios.get(`${keys.BASE_URL}/post/${this.props.postId}`, {
                headers: {
                    Authorization: `${accessToken}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            this.setState({ post: response.data.allPublicPosts });
            this.props.setState(this.state.post);
        } catch (err) {
            console.error(err);
            if (err.message === "Request failed with status code 401") {
                window.alert("Your session has expired pls login again");
            }
        }
    }
    render() {
        return (
            <>
                {this.state.post ?
                    <>
                        <div className="card mt-5 mx-3" style={{ width: "18rem" }}>
                            <img className="card-img-top" src={this.state.post.image} alt="Card img cap" height="300" width="100%" />
                            <div className="card-body">
                                <h5 className="card-title">Title : {this.state.post.imagetitle}</h5>
                                <p className="card-text">Description : {this.state.post.description}</p>
                            </div>
                            <button onClick={this.handleClick} className="btn btn-danger" value={this.props.postId}>Delete post</button>
                        </div>
                    </>
                    : null}
            </>
        );
    }
}

export default connect(mapToPropsUser)(MyPostsCard); 