import axios from "axios";
import keys from "../../config";
import { SET_USER, TOGGLE_AUTHENTICATING, LOGOUT_USER } from "../actionTypes";

export const userRegistration = newUser => async dispatch => {
	try {
		dispatch({ type: TOGGLE_AUTHENTICATING });
		const response = await axios.post(
			`${keys.BASE_URL}/userRegistration`,
			newUser,
		);
		console.log(response.data);
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_AUTHENTICATING });
	}
};

export const userLogin = currentUser => async dispatch => {
	try {
		dispatch({ type: TOGGLE_AUTHENTICATING });
		const response = await axios.post(
			`${keys.BASE_URL}/userLogin`,
			currentUser,
		);
		console.log(response.data);
		dispatch({ type: SET_USER, payload: response.data });
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({ type: TOGGLE_AUTHENTICATING });
	}
};

export const userLogout = () => async (dispatch, getState) => {
	const accessToken = getState().userState.user.accessToken;
	try {
		const response = await axios.delete(`${keys.BASE_URL}/userLogout`, {
			headers: {
				Authorization: `${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		console.log(response.data);
		dispatch({ type: LOGOUT_USER });
	} catch (err) {
		console.error(err);
	}
};
