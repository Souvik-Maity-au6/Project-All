import {
	SET_PRODUCTS,
	TOGGLE_PRODUCTS_FETCHING,
	SET_PRODUCT_DETAILS,
	SET_CART_PRODUCTS,
	SET_ORDERS,
} from "../actionTypes";

const initialState = {
	products: null,
	isProductsFetching: false,
	productDetails: null,
	cartProducts: [],
	orders: null,
};

const dataReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_PRODUCTS:
			return { ...state, products: payload };
		case TOGGLE_PRODUCTS_FETCHING:
			return { ...state, isProductsFetching: !state.isProductsFetching };
		case SET_PRODUCT_DETAILS:
			return { ...state, productDetails: payload };
		case SET_CART_PRODUCTS:
			return { ...state, cartProducts: payload };
		case SET_ORDERS:
			return { ...state, orders: payload };
		default:
			return state;
	}
};

export default dataReducer;
