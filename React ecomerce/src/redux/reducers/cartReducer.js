import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHECKOUT_CART,
	QUANTITY_CHANGE,
} from "../actionTypes";
import {shoe_details} from "./shoe";

const initialState = {
	shoeDetails: shoe_details,
	cartDetails: [],
};

const userReducer = (state = initialState, action) => {
	const {type, payload} = action;
	// console.log("shoeId", state.shoeDetails);
	switch (type) {
		case ADD_TO_CART:
			if (state.cartDetails.length) {
				let sameShoeIndex = state.cartDetails.findIndex(
					cart => cart.product_id === payload,
				);

				let shoe = state.shoeDetails.find(shoe => shoe.product_id === payload);
				if (sameShoeIndex !== -1) {
					state.cartDetails[sameShoeIndex].quantity += 1;
					// console.log(state.cartDetails);
					return {...state};
				} else {
					shoe.quantity = 1;
					return {
						...state,
						cartDetails: [...state.cartDetails, shoe],
					};
				}
			} else {
				let shoe = state.shoeDetails.find(shoe => shoe.product_id === payload);
				shoe.quantity = 1;
				return {
					...state,
					cartDetails: [...state.cartDetails, shoe],
				};
			}

		case REMOVE_FROM_CART:
			return {
				...state,
				cartDetails: state.cartDetails.filter(
					shoe => shoe.product_id !== payload,
				),
			};
		case CHECKOUT_CART:
			return {
				...state,
				cartDetails: [],
			};
		case QUANTITY_CHANGE:
			let shoeIndex = state.cartDetails.findIndex(
				cart => cart.product_id === payload.shoeId,
			);
			state.cartDetails[shoeIndex].quantity = payload.quantity;
			return {...state};
		default:
			return state;
	}
};

export default userReducer;
