import { csrfFetch } from "./csrf";

/** Action Type Constants: */

// /**  Action Creators: */




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
// const initialState = {}
// const listReducer = (state = initialState, action) => {

// 	// checklist are an object of array of objects

// 	switch (action.type) {

// 		default:
// 			return state;
// 	}

// }


// export default listReducer;
