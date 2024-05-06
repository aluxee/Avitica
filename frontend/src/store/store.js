import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import taskReducer from "./task";
import listReducer from "./checklist";
import statsReducer from "./stats";
import shopReducer from "./shop";
import invReducer from "./inventory";
import userStatsReducer from "./userStats";
import avatarReducer from "./avatar";

const rootReducer = combineReducers({
	session: sessionReducer,
	stats: statsReducer,
	task: taskReducer,
	checklist: listReducer,
	shop: shopReducer,
	inventory: invReducer,
	userStats: userStatsReducer,
	avatar: avatarReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = (await import("redux-logger")).default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
