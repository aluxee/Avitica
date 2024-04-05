import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_INV = 'shop/LOAD_INV';



export const loadInventory = (inv) => ({
	type: LOAD_INV,
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


		default:
			return state;
	}

}


export default invReducer;
