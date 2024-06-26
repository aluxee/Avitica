import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_INV = 'inventory/LOAD_INV';
const POST_INV_ITEM = 'inventory/POST_INV_ITEM';
const USE_RED_POTION = 'inventory/USE_RED_POTION';
const REMOVE_INV_ITEM = 'inventory/REMOVE_INV_ITEM';

export const loadInventory = (inv) => ({
	type: LOAD_INV,
	inv
});
export const addInventoryItem = (inv) => ({
	type: POST_INV_ITEM,
	inv
});
export const useInventoryItemRP = (item) => ({

	type: USE_RED_POTION,
	item
})
export const removeInventoryItem = (itemId) => ({
	type: REMOVE_INV_ITEM,
	itemId
});


// /** Thunk Action Creators: */
//* load all items
export const thunkLoadInventory = () => async dispatch => {

	const response = await csrfFetch('/api/inv');

	const data = await response.json();

	// console.log("%c 🚀 ~ file: inventory.js:26 ~ thunkLoadInventory ~ data: ", "color: red; font-size: 25px", data)

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

	console.log("%c 🚀 ~ file: inventory.js:44 ~ thunkAddInventoryItem ~ invArr: ", "color: red; font-size: 25px", invArr)


	const response = await csrfFetch('/api/inv/new', {
		method: 'POST',
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(
			{ cartItems: invArr }
		)
	});

	const data = await response.json();

	console.log("%c 🚀 ~ file: inventory.js:57 ~ thunkAddInventoryItem ~ data: ", "color: turquoise; font-size: 25px", data)

	if (response.ok) {

		const newData = await dispatch(addInventoryItem(data))

		// console.log("%c 🚀 ~ file: inventory.js:63 ~ thunkAddInventoryItem ~ newData: ", "color: turquoise; font-size: 25px", newData, "data inside response.ok: ", data, "the item again: ")


		return newData

	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}
}
export const thunkUseRedPotion = (item, itemId) => async dispatch => {

	console.log("%c 🚀 ~ file: inventory.js:81 ~ thunkUseRedPotion ~ itemId: ", "color: red; font-size: 25px", itemId)


	const response = await csrfFetch(`/api/inv/${itemId}/red-potion`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(item)
	})
	console.log("%c 🚀 ~ file: inventory.js:84 ~ thunkUseRedPotion ~ response: ", "color: magenta; font-size: 25px", response, "then the item:", item)

	if (response.ok) {
		const data = await response.json();
		dispatch(useInventoryItemRP(data))
		return data
	} else {
		const errResponse = await response.json()
		return errResponse;
	}

}

export const thunkRemoveInventoryItem = (itemId) => async dispatch => {


	const response = await csrfFetch(`/api/inv/${itemId}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (response.ok) { // removed data and replaced it with id

		await dispatch(removeInventoryItem(itemId))
		// return taskId
	}
}


// __________________________________________reducer________________________________________

const initialState = {}
const invReducer = (state = initialState, action) => {

	switch (action.type) {

		case LOAD_INV: {
			const invState = {}
			action.inv.Inventory.forEach(item => {
				invState[item.id] = item;
			})
			return invState;
		}
		case POST_INV_ITEM: {
			const postState = { ...state }
			action.inv.inventory.forEach(item => {
				postState[item.id] = item
			})
			return postState;
		}
		case USE_RED_POTION: {
			const useState = { ...state };
			if (action.item && action.item.userStats) {
				//update the health property of userStats with the new health value received from the action
				return {
					...state,
					userStats: {
						...state.userStats,
						health: action.item.userStats.health
					}
				}
			} else {
				return useState
			}
		}
		
		case REMOVE_INV_ITEM: {
			const removeState = { ...state };
			delete removeState[action.id];
			return removeState;
		}

		default:
			return state;
	}

}


export default invReducer;
