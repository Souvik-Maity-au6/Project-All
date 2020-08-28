import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHECKOUT_CART,
	QUANTITY_CHANGE,
} from "../actionTypes";

export const addToCart = shoeId => {
	return {
		type: ADD_TO_CART,
		payload: shoeId,
	};
};

export const removeFromCart = shoeId => {
	return {
		type: REMOVE_FROM_CART,
		payload: shoeId,
	};
};

export const checkoutCart = () => {
	return {
		type: CHECKOUT_CART,
	};
};

export const quantityChange = (shoeId, quantity) => {
	return {
		type: QUANTITY_CHANGE,
		payload: {shoeId, quantity},
	};
};
