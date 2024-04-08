import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_CHECKLIST = 'checklist/LOAD_CHECKLIST';
export const POST_CHECKLIST = 'checklist/POST_CHECKLIST';
export const UPDATE_CHECKLIST = 'checklist/UPDATE_CHECKLIST';
export const REMOVE_CHECKLIST = 'checklist/REMOVE_CHECKLIST';
// /**  Action Creators: */

//? checklist:

export const loadChecklist = (taskId, checklist) => ({
	type: LOAD_CHECKLIST,
	taskId, checklist
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

		console.log("%c 🚀 ~ file: checklist.js:54 ~ thunkLoadChecklist ~ data: ", "color: red; font-size: 25px", data)



		dispatch(loadChecklist(taskId, data))
	} else {
		const errorResponse = await response.json()
		return errorResponse
	}
}


// //* create / post a listItem
// export const thunkCreateChecklist = (listItem) => async (dispatch) => {

// 	const response = await csrfFetch('/api/checklist', {
// 		method: 'POST',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(checklist.listItem)
// 	})

// 	if (response.ok) {

// 		await dispatch(createChecklist(listItem))
// 		return listItem

// 	} else {
// 		const errorResponse = await response.json()
// 		return errorResponse
// 	}
// }

// edit a listItem
export const thunkEditChecklist = (taskId, checklistId, checked) => async (dispatch) => {

	console.log("%c 🚀 ~ file: task.js:264 ~ thunkEditChecklist ~ checked: ", "color: white; font-size: 25px", checked)


	console.log("%c 🚀 ~ file: task.js:264 ~ thunkEditChecklist ~ checklistId: ", "color: white; font-size: 25px", checklistId)


	const id = Number(checklistId);


	// see sc for mdn times and sorts
	const response = await csrfFetch(`/api/tasks/${taskId}/checklist/${id}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ checked })
	})


	if (response.ok) {
		// const updateList = await response.json();

		dispatch(editChecklist(taskId, id, checked))

		// return updateList

	} else {
		const errorResponse = await response.json();

		return errorResponse
	}
}


// //* delete/remove a listItem
// export const thunkRemoveChecklist = (checklistId) => async dispatch => {

// 	const response = await csrfFetch(`/api/checklist/${checklistId}`, {
// 		method: 'DELETE',
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	});

// 	if (response.ok) { // removed data and replaced it with id

// 		dispatch(removeTask(listItem.id))

// 		return listItem.id
// 	}
// }
//  __________________________________________reducer________________________________________
const initialState = {}
const listReducer = (state = initialState, action) => {

console.log("%c 🚀 ~ file: checklist.js:143 ~ listReducer ~ state: ", "color: red; font-size: 25px", state)


	// checklist are an object of array of objects

	switch (action.type) {

		case LOAD_CHECKLIST: {
			const newState = { ...state };

			console.log("%c 🚀 ~ file: task.js:346 ~ taskReducer ~ newState: ", "color: red; font-size: 25px", newState)


			action.checklist.forEach(item => {
				newState[item.id] = item;
			});

			console.log("%c 🚀 ~ file: task.js:353 ~ taskReducer ~ action: ", "color: green; font-size: 25px", newState)

			return newState;
		}

		case POST_CHECKLIST: {
			return {
				...state,
				[action.listItem.id]: { ...action.listItem }
			};
		}

		case UPDATE_CHECKLIST: {
			const newState = { ...state }


			newState[action.checklistId].checked = action.checked

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
