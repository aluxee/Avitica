import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_CHECKLIST = 'checklist/LOAD_CHECKLIST';
export const POST_CHECKLIST = 'checklist/POST_CHECKLIST';
export const EDIT_CHECKLIST_ITEM = 'checklist.EDIT_CHECKLIST_ITEM';
export const UPDATE_CHECKED_CHECKLIST = 'checklist/UPDATE_CHECKED_CHECKLIST';
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


export const editCheckedChecklist = (taskId, checklistId, checked) => ({
	type: UPDATE_CHECKED_CHECKLIST,
	taskId, checklistId, checked
});

export const editChecklistItem = (taskId, checklistId, checklistItem) => ({
	type: EDIT_CHECKLIST_ITEM,
	taskId, checklistId, checklistItem
})

export const removeChecklist = (checklistId) => {
	return {
		type: REMOVE_CHECKLIST,
		checklistId
	}
};




// /** Thunk Action Creators: */

//* load checklist for specific task
export const thunkLoadChecklist = (taskId) => async dispatch => {

	const response = await csrfFetch(`/api/tasks/${taskId}/checklist`);


	if (response.ok) {
		const data = await response.json();
		dispatch(loadChecklist(data))
		// console.log("%c 🚀 ~ file: checklist.js:53 ~ thunkLoadChecklist ~ data: ", "color: cornflowerblue; font-size: 25px", data)
		return data
	} else {
		const errorResponse = await response.json()
		return errorResponse
	}
}


//* create / post a listItem
export const thunkCreateChecklist = (taskId, item) => async (dispatch) => {

	console.log("%c 🚀 ~ file: checklist.js:68 ~ thunkCreateChecklist ~ item: ", "color: purple; font-size: 25px", item, "taskID", taskId)


	const response = await csrfFetch(`/api/tasks/${taskId}/checklist/new`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(item)
	})
	console.log("%c 🚀 ~ file: checklist.js:71 ~ thunkCreateChecklist ~ response: ", "color: red; font-size: 25px", response)

	const data = await response.json();
	data.taskId = taskId;
	console.log("%c 🚀 ~ file: checklist.js:81 ~ thunkCreateChecklist ~ data: ", "color: red; font-size: 25px", data)

	if (response.ok) {
		await dispatch(createChecklist(data))
		return data
	} else {
		const errorResponse = await response.json();

		console.log("%c 🚀 ~ file: checklist.js:90 ~ thunkCreateChecklist ~ errorResponse: ", "color: red; font-size: 25px", errorResponse)

		return errorResponse
	}
}

// edit a listItem that is or is not checked
export const thunkEditCheckedChecklist = (taskId, checklistId, checked) => async (dispatch) => {

	const id = Number(checklistId);
	const taskPostId = Number(taskId);
	// see sc for mdn times and sorts
	const response = await csrfFetch(`/api/tasks/${taskPostId}/checklist/${id}/checked`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ checked })
	})


	if (response.ok) {
		const updateList = await response.json();

		dispatch(editCheckedChecklist(taskId, id, checked))

		return updateList

	} else {
		const errorResponse = await response.json();

		return errorResponse
	}
}


export const thunkEditChecklistItem = (taskId, checklistId, checklistItem) => async (dispatch) => {

	const id = Number(checklistId);
	const taskPostId = Number(taskId);

	// see sc for mdn times and sorts
	const response = await csrfFetch(`/api/tasks/${taskPostId}/checklist/${id}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ checklistItem })
	})


	if (response.ok) {

		const updateList = await response.json();

		dispatch(editCheckedChecklist(taskId, id, updateList))

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
			const newState = [{ ...state }]

			if (action.checklist.message) {
				return []
			} else {

				action.checklist.forEach(item => {
					newState[item.id] = item;
				});

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
		case EDIT_CHECKLIST_ITEM: {
			console.log("%c 🚀 ~ file: checklist.js:214 ~ taskReducer ~ action: ", "color: green; font-size: 25px", action)

			return { ...state, [action.checklist.id]: action.checklist }
		}

		case UPDATE_CHECKED_CHECKLIST: {
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
			const removeState = [...state];

			console.log("%c 🚀 ~ file: checklist.js:255 ~ listReducer ~ removeState: ", "color: red; font-size: 25px", "BEFORE", removeState)


			delete removeState[action.id];
			console.log("%c 🚀 ~ file: checklist.js:255 ~ listReducer ~ removeState: ", "color: red; font-size: 25px", "AFTER: ", removeState)
			return removeState;
		}
		default:
			return state;
	}

}


export default listReducer;
