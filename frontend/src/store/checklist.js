import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_CHECKLIST = 'checklist/LOAD_CHECKLIST';
export const POST_CHECKLIST = 'checklist/POST_CHECKLIST';
export const UPDATE_CHECKLIST = 'checklist/UPDATE_CHECKLIST';
export const REMOVE_CHECKLIST = 'checklist/REMOVE_CHECKLIST';

// /**  Action Creators: */

export const loadChecklist = () => ({
	type: LOAD_CHECKLIST,
	checklist
});



export const createChecklist = (listItem) => ({
	type: POST_CHECKLIST,
	listItem
});


export const editChecklist = (listItem) => ({
	type: UPDATE_CHECKLIST,
	listItem
});


export const removeChecklist = (checklistId) => {
	return {
		type: REMOVE_CHECKLIST,
		checklistId
	}
};



// /** Thunk Action Creators: */

//* load all checklist
export const thunkLoadChecklist = () => async dispatch => {


	const response = await csrfFetch('/api/checklist');


	if (response.ok) {
		const checklist = await response.json();


		dispatch(loadChecklist(checklist))
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
export const thunkEditChecklist = (listItem, checklistId) => async (dispatch) => {

	const checklistId = Number(checklistId);


	// see sc for mdn times and sorts
	const response = await csrfFetch(`/api/checklist/${checklistId}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(listItem)
	})


	if (response.ok) {
		const updateList = await response.json();

		dispatch(editChecklist(updateList))
		return updateList

	} else {
		const errorResponse = await response.json();

		return errorResponse
	}
}


// //* delete/remove a listItem
// export const thunkRemoveChecklist = (listItem) => async dispatch => {

// 	const response = await csrfFetch(`/api/checklist/${listItem.id}`, {
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

	// checklist are an object of array of objects

	switch (action.type) {
		case LOAD_CHECKLIST: {
			const allListState = { ...state };

			// console.log("%c 🚀 ~ file: listItem.js:190 ~ taskReducer ~ allListState: ", "color: red; font-size: 25px", allListState)


			action.checklist.listItem.forEach(listItem => {
				let newTaskState = { ...listItem }
				allListState[listItem.id] = newTaskState;
			});
			return allListState;
		};


		case POST_CHECKLIST: {
			const newTaskState = { ...state }

			const newList = { ...action.listItem }

			newTaskState[action.listItem.id] = {
				...newList
			}

			return newTaskState;

		}

		case UPDATE_CHECKLIST: {
			const updatedState = { ...state }

			const newList = { ...action.listItem }

			updatedState[newList.id] = {
				...state[action.listItem.id], ...newList
			}

			return updatedState;
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
