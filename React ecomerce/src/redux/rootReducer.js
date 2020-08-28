import {combineReducers} from "redux";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
	userState: userReducer,
	shopingState: cartReducer,
});

export default rootReducer;
