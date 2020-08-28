import {REGISTER_USER, LOGIN_USER, LOGOUT_USER} from "../actionTypes";

export const registerUser = user => {
	return {
		type: REGISTER_USER,
		payload: user,
	};
};

export const loginUser = userId => {
	return {
		type: LOGIN_USER,
		payload: userId,
	};
};

export const logoutUser = userId => {
	return {
		type: LOGOUT_USER,
		payload: userId,
	};
};
