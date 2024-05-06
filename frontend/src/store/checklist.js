import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_CHECKLIST = 'checklist/LOAD_CHECKLIST';
export const POST_CHECKLIST = 'checklist/POST_CHECKLIST';
export const UPDATE_CHECKLIST = 'checklist/UPDATE_CHECKLIST';
export const REMOVE_CHECKLIST = 'checklist/REMOVE_CHECKLIST';
// /**  Action Creators: */

//? checklist:

export const loadChecklist = (checklist) => ({
	type: LOAD_CHECKLIST,
	checklist
});


export const createChecklist = (item) => ({
	type: POST_CHECKLIST,
	item
});


export const editChecklist = (taskId, checklistId, checked) => ({
	type: UPDATE_CHECKLIST,
	taskId, checklistId, checked
});


export const removeChecklist = (checklistId) => {
	return {
		type: REMOVE_CHECKLIST,
		checklistId
	}
};




// /** Thunk Action Creators: */

//* load checklist for specific task
export const thunkLoadChecklist = (taskId) => async dispatch => {

	console.log("%c 🚀 ~ file: checklist.js:44 ~ thunkLoadChecklist ~ checklist: ", "color: gold; font-size: 36px", taskId)

	const response = await csrfFetch(`/api/tasks/${taskId}/checklist`);


	if (response.ok) {
		const data = await response.json();
		dispatch(loadChecklist(data))
		console.log("%c 🚀 ~ file: checklist.js:53 ~ thunkLoadChecklist ~ data: ", "color: cornflowerblue; font-size: 25px", data)
		return data
	} else {
		const errorResponse = await response.json()
		return errorResponse
	}
}


//* create / post a listItem
export const thunkCreateChecklist = (taskId, item) => async (dispatch) => {

	const response = await csrfFetch(`/api/tasks/${taskId}/checklist/new`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(item)
	})

	if (response.ok) {
		const data = await response.json();
		await dispatch(createChecklist(data))
		return data

	} else {
		const errorResponse = await response.json()
		return errorResponse
	}
}

// edit a listItem
export const thunkEditChecklist = (taskId, checklistId, checked) => async (dispatch) => {

	console.log("%c 🚀 ~ file: task.js:264 ~ thunkEditChecklist ~ checked: ", "color: white; font-size: 25px", checked)


	console.log("%c 🚀 ~ file: task.js:264 ~ thunkEditChecklist ~ checklistId: ", "color: white; font-size: 25px", checklistId)

	const id = Number(checklistId);
	const taskPostId = Number(taskId);
	// see sc for mdn times and sorts
	const response = await csrfFetch(`/api/tasks/${taskPostId}/checklist/${id}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ checked })
	})


	if (response.ok) {
		const updateList = await response.json();

		console.log("%c 🚀 ~ file: checklist.js:107 ~ thunkEditChecklist ~ updateList: ", "color: white; font-size: 25px", updateList)


		const List = dispatch(editChecklist(taskId, id, checked))

		console.log("%c 🚀 ~ file: checklist.js:109 ~ thunkEditChecklist ~ List: ", "color: white; font-size: 25px", List)


		return updateList

	} else {
		const errorResponse = await response.json();

		return errorResponse
	}
}


// //* delete/remove a listItem
export const thunkRemoveChecklist = (taskId, checklistId) => async dispatch => {

	const response = await csrfFetch(`/api/tasks/${taskId}/checklist/${checklistId}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (response.ok) { // removed data and replaced it with id
		const data = await response.json();
		dispatch(removeChecklist(checklistId))
		return data
	}
}


//  __________________________________________reducer________________________________________

const initialState = [];
const listReducer = (state = initialState, action) => {

	console.log("%c 🚀 ~ file: checklist.js:143 ~ listReducer ~ state: ", "color: red; font-size: 25px", state)


	// checklist are an object of array of objects

	switch (action.type) {

		case LOAD_CHECKLIST: {
			const newState = [{...state}]

			console.log("%c 🚀 ~ file: task.js:346 ~ taskReducer ~ newState: ", "color: green; font-size: 25px", newState)

			if (action.checklist.message) {
				return newState
			} else {

				action.checklist.forEach(item => {
					newState[item.id] = item;
				});

				console.log("%c 🚀 ~ file: task.js:353 ~ taskReducer ~ action: ", "color: green; font-size: 25px", newState)

				return [...action.checklist];
			}
		}

		case POST_CHECKLIST: {
			const newState = [...state];
			const checklist = [{ [action.item.id]: { ...action.item } }, newState]
			// return {
			// 	...state,
			// 	[action.listItem.id]: { ...action.listItem }
			// };
			return checklist
		}

		case UPDATE_CHECKLIST: {
			const newState = [...state]

			const index = newState.findIndex(item => item.id === action.checklistId);

			// If the checklist item is found
			if (index !== -1) {
				// Create a new checklist item object with updated properties
				const updatedChecklistItem = {
					...newState[index], //spread state normalized
					checked: action.checked // Update the checked property
				};

				// Create a new updated state arr with the updated checklist item
				const updatedState = [
					...newState.slice(0, index), // spread non-updated items
					updatedChecklistItem, // Insert updated item
					...newState.slice(index + 1) // Keep any items after the updated item unchanged
				];

				// Return the new updated state arr
				return updatedState;
			}
			return newState;
		}

		case REMOVE_CHECKLIST: {
			const removeState = { ...state };

			delete removeState[action.id];
			return removeState;
		}
		default:
			return state;
	}

}


export default listReducer;
