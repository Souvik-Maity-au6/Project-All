import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from '../redux/actions/userActions';
import '../styles/Navbar.css';

const Navbar = (props) => {
	const handleLogout = (event) => {
		props.userLogout();
		props.history.push('/login');
	};
	// console.log(loggedInUser);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link className="navbar-brand" to="/">
				<img
					src="https://www.freepngimg.com/thumb/shoes/28084-5-sneaker-transparent-image.png"
					width="50"
					height="50"
					className="d-inline-block align-top"
					alt="logo"
					loading="lazy"
				/>
				shoe-carnival
			</Link>
			<ul className="navbar-nav mr-auto pl-5">
				<li className="nav-item">
					<Link className="nav-link" to="/menShoes">Men</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/womenShoes">Women</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/kidsShoes">Kids</Link>
				</li>
			</ul>
			{props.userObj.user ? (<>
				<button onClick={handleLogout} className="btn btn-outline-danger my-2 my-sm-0 px-5" type="submit">
					Logout
				</button>
				<Link className="cart-box mx-5" to="/cart"><i className="fa fa-cart-arrow-down fa-3x" aria-hidden="true"></i><p>({props.data.cartProducts ? props.data.cartProducts.length : 0})</p></Link>
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" to="/orders">Orders</Link>
					</li>
				</ul>;

			</>) : (
					<Link to="/login">
						<button className="btn btn-outline-success my-2 my-sm-0 px-5" type="submit">
							Login
				</button>
					</Link>
				)}
		</nav>
	);
};

const mergeStateToProps = (reduxStore) => {

	return {
		userObj: { ...reduxStore.userState },
		data: { ...reduxStore.dataState },
	}
}


export default connect(mergeStateToProps, { userLogout })(withRouter(Navbar));
