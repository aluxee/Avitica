import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SHOP = 'shop/LOAD_SHOP';

// /**  Action Creators: */
export const loadShop = (shop) => ({
	type: LOAD_SHOP,
	shop
});

// /** Thunk Action Creators: */
//* load all tasks
export const thunkLoadShop = () => async dispatch => {

	const response = await csrfFetch('/api/shop');

	if (response.ok) {

		const data = await response.json();

		dispatch(loadShop(data))
		return data

	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}
}

// __________________________________________reducer________________________________________

const initialState = {}
const shopReducer = (state = initialState, action) => {

	switch (action.type) {
		case LOAD_SHOP: {
			console.log("%c 🚀 ~ file: shop.js:29 ~ shopReducer ~ action: ", "color: red; font-size: 25px", action, "then state", state,)

			const shopState = {}

			// const shopData = { ...action }
			return shopState;
		}

		default:
			return state;
	}

}


export default shopReducer;
