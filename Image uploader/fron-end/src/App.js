import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

// Load Components
import Navbar from "./components/Navbar";
import RouteProtection from "./components/RouteProtection";

// Load Pages
import Timeline from "./pages/Timeline";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPost from "./pages/UploadPost";
import Favourites from "./pages/Favourites";
import MyPosts from "./pages/MyPosts";

import "./styles/App.css";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<RouteProtection exact path="/upload-post" component={UploadPost} />
				<RouteProtection exact path="/favourites" component={Favourites} />
				<RouteProtection exact path="/my-posts" component={MyPosts} />
				<Route exact path="/timeline" component={Timeline} />
				<Redirect to="/timeline" />
			</Switch>
			<Switch />
		</div>
	);
}

export default App;
