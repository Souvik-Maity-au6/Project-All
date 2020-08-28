export const mapToPropsUser = reduxStore => {
	return {
		userObj: {...reduxStore.userState},
	};
};

export const mapToPropsData = reduxStore => {
	return {
		data: {...reduxStore.dataState},
	};
};
