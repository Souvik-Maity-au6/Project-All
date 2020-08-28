import axios from "axios";
import keys from "../../config";
import {
	SET_PUBLIC_POSTS,
	TOGGLE_PUBLIC_POSTS_FETCHING,
	SET_USER,
} from "../actionTypes";

export const fetchAllPublicPost = () => async dispatch => {
	try {
		dispatch({type: TOGGLE_PUBLIC_POSTS_FETCHING});
		const response = await axios.get(`${keys.BASE_URL}/allPublicPosts`);
		dispatch({type: SET_PUBLIC_POSTS, payload: response.data});
	} catch (err) {
		console.error(err);
	} finally {
		dispatch({type: TOGGLE_PUBLIC_POSTS_FETCHING});
	}
};

export const addToFavoriteList = postId => async (dispatch, getState) => {
	const accessToken = getState().userState.user.token;
	const userObj = getState().userState.user;
	console.log(accessToken);
	try {
		const response = await fetch(`${keys.BASE_URL}/addToFavourite/${postId}`, {
			method: "POST",
			headers: {
				Authorization: `${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		console.log(response.data);
		userObj.favourites.push(postId);
		dispatch({type: SET_USER, payload: {...userObj}});
	} catch (err) {
		console.error(err);
		if (err.message === "Request failed with status code 401") {
			window.alert("Your session has expired pls login again");
		}
	}
};

export const uploadPost = post => async (dispatch, getState) => {
	const accessToken = getState().userState.user.token;
	const userObj = getState().userState.user;
	try {
		const response = await axios.post(`${keys.BASE_URL}/addData`, post, {
			headers: {
				Authorization: `${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		userObj.posts.push(response.data.data.id);
		dispatch({type: SET_USER, payload: {...userObj}});
	} catch (err) {
		console.log(err.message);
		if (err.message === "Request failed with status code 401") {
			window.alert("Your session has expired pls login again");
		}
	}
};
