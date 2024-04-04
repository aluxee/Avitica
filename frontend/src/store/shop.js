import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SHOP = 'shop/LOAD_SHOP';
export const LOAD_CURRENT = 'shop/LOAD_CURRENT';


export const loadShop = (shop) => ({
	type: LOAD_SHOP,
	shop
});
export const loadCurrentItem = (item) => ({
	type: LOAD_CURRENT,
	item

});

// /** Thunk Action Creators: */
//* load all items
export const thunkLoadShop = () => async dispatch => {

	const response = await csrfFetch('/api/shop');

	if (response.ok) {

		const data = await response.json();

		await dispatch(loadShop(data))
		return data

	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}
}


//* load current items
export const thunkLoadCurrentItem = (id) => async dispatch => {

	const response = await csrfFetch(`/api/shop/details/${id}`);

	console.log("%c 🚀 ~ file: shop.js:43 ~ thunkLoadCurrentItem ~ response: ", "color: magenta; font-size: 25px", response)

	const itemData = await response.json();

	console.log("%c 🚀 ~ file: shop.js:44 ~ thunkLoadCurrentItem ~ itemData: ", "color: magenta; font-size: 25px", itemData)


	if (!itemData.errors) {
		await dispatch(loadCurrentItem(itemData))
		// console.log("🚀 ~ file: spot.js:131 ~ thunkLoadCurrentSpots ~ spotsCurrentData:", spotsCurrentData)
		return itemData;

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
			action.shop.Shop.forEach(item => {
				shopState[item.id] = item;
			})
			return shopState;
		}

		case LOAD_CURRENT: {

			const itemState = { ...state, [action.item.itemDetails.id]: action.item.itemDetails }

			return itemState;
		}

		default:
			return state;
	}

}


export default shopReducer;
