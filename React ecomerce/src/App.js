import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import "./App.css";
// Load pages

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import FinishPage from "./pages/FinishPage";
// Load components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/finish" component={FinishPage} />
				<Route path="/cart" component={CartPage} />
				<Route path="/registration" component={RegistrationPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/" component={HomePage} />
				<Redirect to="/" />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
