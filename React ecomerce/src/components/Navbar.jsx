import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from '../redux/actions/userActions';
import '../styles/Navbar.css';

const Navbar = (props) => {
	// console.log("navbar rendaring");
	// console.log("user", props);
	let loggedInUser = null;
	props.user.length ? loggedInUser = props.user.find(u => u.isLoggedIn === true) : loggedInUser = undefined;
	const handleLogout = (event) => {
		props.logout(loggedInUser.user_id);
		props.history.push('/login');
	};
	// console.log(loggedInUser);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link className="navbar-brand mr-auto" to="/">
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

			{loggedInUser !== undefined ? (<>
				<button onClick={handleLogout} className="btn btn-outline-danger my-2 my-sm-0 px-5" type="submit">
					Logout
				</button>
				<Link className="cart-box mx-5" to="/cart"><i className="fa fa-cart-arrow-down fa-3x" aria-hidden="true"></i><p>({props.cartStore.length})</p></Link>;

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

const mapStateToProps = (storeState, ownState) => {
	// console.log(storeState.userState.user);
	return {
		user: storeState.userState.user.length ? [...storeState.userState.user] : storeState,
		cartStore: storeState.shopingState.cartDetails
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: userId => dispatch(logoutUser(userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
