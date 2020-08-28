import axios from "axios";
import keys from "../../config";
import {
	SET_PRODUCTS,
	TOGGLE_PRODUCTS_FETCHING,
	SET_PRODUCT_DETAILS,
	SET_CART_PRODUCTS,
	SET_ORDERS,
} from "../actionTypes";

export const fetchAllProducts = (category = "") => async dispatch => {
	try {
		dispatch({ type: SET_PRODUCTS, payload: null });
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
		const response = await axios.get(
			`${keys.BASE_URL}/getProducts${category.length
				? "?category=" + category
				: ""}`,
		);
		dispatch({ type: SET_PRODUCTS, payload: response.data.products });
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
	}
};

export const fetchProductsDetails = productId => async dispatch => {
	try {
		dispatch({ type: SET_PRODUCT_DETAILS, payload: null });
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
		const response = await axios.get(
			`${keys.BASE_URL}/productDetails/${productId}`,
		);
		dispatch({ type: SET_PRODUCT_DETAILS, payload: response.data.product });
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
	}
};

export const fetchAllCartProducts = () => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	try {
		dispatch({ type: SET_CART_PRODUCTS, payload: [] });
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
		const response = await axios.get(`${keys.BASE_URL}/getCartProducts`, {
			headers: {
				Authorization: `${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		console.log(response.data);
		dispatch({ type: SET_CART_PRODUCTS, payload: response.data.products });
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
	}
};

export const addToCart = productId => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	const cart = getState().dataState.cartProducts;
	try {
		const response = await axios.post(
			`${keys.BASE_URL}/addToCart/${productId}`,
			{},
			{
				headers: {
					Authorization: `${accessToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		);
		console.log(response.data);
		cart.push(response.data);
		dispatch({ type: SET_CART_PRODUCTS, payload: cart });
	} catch (err) {
		console.error(err);
	}
};

export const removeFromCart = productId => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	try {
		const response = await axios.delete(
			`${keys.BASE_URL}/removeFromCart/${productId}`,
			{
				headers: {
					Authorization: `${accessToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		);
		console.log(response.data);
	} catch (err) {
		console.error(err);
	}
};

export const checkoutCart = () => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	try {
		const response = await axios.post(
			`${keys.BASE_URL}/checkout/`,
			{},
			{
				headers: {
					Authorization: `${accessToken}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		);
		console.log(response.data);
		dispatch({ type: SET_CART_PRODUCTS, payload: [] });
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
	}
};

export const fetchOrderProducts = () => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	try {
		dispatch({ type: SET_ORDERS, payload: null });
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
		const response = await axios.get(`${keys.BASE_URL}/getOrders`, {
			headers: {
				Authorization: `${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		console.log(response.data);
		dispatch({ type: SET_ORDERS, payload: response.data });
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_PRODUCTS_FETCHING });
	}
};
