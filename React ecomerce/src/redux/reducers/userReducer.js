import {REGISTER_USER, LOGIN_USER, LOGOUT_USER} from "../actionTypes";

const initialState = {
	user: [],
};

const userReducer = (state = initialState, action) => {
	const {type, payload} = action;
	switch (type) {
		case REGISTER_USER:
			return {
				...state,
				user: state.user !== null ? [...state.user, payload] : [payload],
			};
		case LOGIN_USER:
			const userIndexLogin = state.user.findIndex(u => u.user_id === payload);
			state.user[userIndexLogin].isLoggedIn = true;
			return {...state};
		case LOGOUT_USER:
			const userIndexLogout = state.user.findIndex(u => u.user_id === payload);
			state.user[userIndexLogout].isLoggedIn = false;
			return {...state};
		default:
			return state;
	}
};

export default userReducer;
