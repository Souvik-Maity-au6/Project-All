import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
// Load pages

import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import KidsPage from "./pages/KidsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import FinishPage from "./pages/FinishPage";
import OrderPage from "./pages/OrderPage";
// Load components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteProtection from "./components/RouteProtection";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<RouteProtection path="/finish" component={FinishPage} />
				<RouteProtection path="/cart" component={CartPage} />
				<RouteProtection path="/orders" component={OrderPage} />
				<Route path="/menShoes" component={MenPage} />
				<Route path="/womenShoes" component={WomenPage} />
				<Route path="/kidsShoes" component={KidsPage} />
				<Route
					path="/productDetails/:productId"
					component={ProductDetailsPage}
				/>
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
