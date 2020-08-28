import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadPost } from '../redux/actions/dataActions';

const initialState = {
  image: "",
  imagetitle: "",
  description: "",
  privacystatus: "",
};

class UploadPost extends Component {
  state = initialState;

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeFile = (event) => {
    this.setState({ image: event.target.files[0] });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state);
    const formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("imagetitle", this.state.imagetitle);
    formData.append("description", this.state.description);
    formData.append("privacystatus", this.state.privacystatus);
    this.props.uploadPost(formData);
    this.setState(initialState);
    window.alert("your post has been uploaded successfully");
    this.props.history.push("/my-posts");
  };
  render() {
    return (
      <div className="UploadPost col-md-6 mx-auto mt-5 ">
        <h1 className="text-center">Upload Post</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              onChange={this.handleChangeFile}
              className="form-control"
              name="image"
              id="image"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              onChange={this.handleChange}
              value={this.state.imagetitle}
              type="title"
              name="imagetitle"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              onChange={this.handleChange}
              value={this.state.description}
              type="text"
              name="description"
              className="form-control"
              id="description"
              placeholder="Enter Description"
            />
          </div>
          <div className="form-group">
            <label>Privacy status : </label>
            <select
              onChange={this.handleChange}
              value={this.state.privacystatus}
              name="privacystatus"
              id="exampleInputPassword1"
            ><option value="" disabled>Select privacy</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
        </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { uploadPost })(UploadPost);
