import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_INV = 'inventory/LOAD_INV';
const POST_INV_ITEM = 'inventory/POST_INV_ITEM';


export const loadInventory = (inv) => ({
	type: LOAD_INV,
	inv
});
export const addInventoryItem = (inv) => ({
	type: POST_INV_ITEM,
	inv
});


// /** Thunk Action Creators: */
//* load all items
export const thunkLoadInventory = () => async dispatch => {

	const response = await csrfFetch('/api/inv');

	const data = await response.json();
	if (response.ok) {

		await dispatch(loadInventory(data))
		return data

	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}
}

//* add all items
export const thunkAddInventoryItem = (invArr) => async dispatch => {

	const response = await csrfFetch('/api/inv/new', {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(
			{ cartItems: invArr }
		)
	});

	const data = await response.json();
	if (response.ok) {

	const newData = await dispatch(addInventoryItem(data))

		return newData

	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}
}




// __________________________________________reducer________________________________________

const initialState = {}
const invReducer = (state = initialState, action) => {

	switch (action.type) {

		case LOAD_INV: {
			// console.log("%c 🚀 ~ file: inventory.js:44 ~ invReducer ~ action: ", "color: orange; font-size: 25px", action)

			const invState = {}
			action.inv.Inventory.forEach(item => {
				invState[item.id] = item;
			})
			return invState;
		}
		case POST_INV_ITEM: {
			const postState = {...state}
			action.inv.inventory.forEach(item => {
				postState[item.id] = item
			})
			return postState;
		}


		default:
			return state;
	}

}


export default invReducer;
