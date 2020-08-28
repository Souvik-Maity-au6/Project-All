import {
	SET_PUBLIC_POSTS,
	TOGGLE_PUBLIC_POSTS_FETCHING,
	UPLOAD_POSTS,
	TOGGLE_POSTS_UPLOADING,
} from "../actionTypes";

const initialState = {
	publicPosts: null,
	isPublicPostFetching: false,
	uploadedPosts: null,
	isPostsUploading: false,
};

const dataReducer = (state = initialState, action) => {
	const {type, payload} = action;
	switch (type) {
		case SET_PUBLIC_POSTS:
			return {...state, publicPosts: payload};
		case TOGGLE_PUBLIC_POSTS_FETCHING:
			return {...state, isPublicPostFetching: !state.isPublicPostFetching};

		case UPLOAD_POSTS:
			return {...state, uploadedPosts: payload};
		case TOGGLE_POSTS_UPLOADING:
			return {...state, isPostsUploading: !state.isPostsUploading};
		default:
			return state;
	}
};

export default dataReducer;
