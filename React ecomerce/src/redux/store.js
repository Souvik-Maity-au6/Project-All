import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

// store.dispatch({
// 	type: "REGISTER_USER",
// 	payload: {
// 		user_id: "1",
// 		name: "souvik maity",
// 		email: "kingsouvik111@gmail.com",
// 		password: "1234",
// 		isLoggedIn: false,
// 	},
// });

// store.dispatch({
// 	type: "LOGIN_USER",
// 	payload: "1",
// });

export default store;
