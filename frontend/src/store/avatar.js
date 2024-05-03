import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_AVATAR = 'avatar/LOAD_AVATAR';
export const LOAD_CURRENT_AVATAR = 'avatar/LOAD_CURRENT_AVATAR';
export const POST_AVATAR = 'avatar/POST_AVATAR';
export const UPDATE_AVATAR = 'avatar/UPDATE_AVATAR';
export const REMOVE_AVATAR = 'avatar/REMOVE_AVATAR';
// for task completion status
export const UPDATE_AVATAR_STATUS = 'avatar/UPDATE_AVATAR_STATUS';

// /**  Action Creators: */

export const loadAvatar = () => ({
	type: LOAD_AVATAR,
	avatar
});



export const createAvatar = (data) => ({
	type: POST_AVATAR,
	data
});


export const editAvatar = (task) => ({
	type: UPDATE_AVATAR,
	task
});



// /** Thunk Action Creators: */

//* load avatar
export const thunkLoadAvatar = () => async dispatch => {

	const response = await csrfFetch('/api/avatar');

	if (response.ok) {
		const avatar = await response.json();

		console.log("%c 🚀 ~ file: avatar.js:44 ~ thunkLoadAvatar ~ response: ", "color: red; font-size: 25px", response)


		console.log("%c 🚀 ~ file: avatar.js:44 ~ thunkLoadAvatar ~ avatar: ", "color: red; font-size: 25px", avatar)


		dispatch(loadAvatar())
		return avatar

	} else {
		const errorResponse = await response.json()
		return errorResponse
	}
}

// //* create / post a task
export const thunkCreateAvatar = (avatarData) => async (dispatch) => {


	const response = await csrfFetch('/api/avatar/create', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(avatarData)
	})

	if (!response.ok) {
		const errResponse = await response.json()
		return errResponse;
	} else {
		const data = await response.json();
		dispatch(createAvatar(data))
		return data
	}
}

// edit a task
export const thunkEditAvatar = () => async (dispatch) => {


	const response = await csrfFetch(`/api/avatar/${taskId}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task)
	})


	if (response.ok) {
		const data = await response.json();
		dispatch(editTask(data));
		return data
	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}
}

// //* delete/remove a task
export const thunkRemoveTask = (taskId) => async dispatch => {

	// console.log("%c 🚀 ~ file: task.js:174 ~ thunkRemoveTask ~ taskId: ", "color: cyan; font-size: 25px", taskId)


	const response = await csrfFetch(`/api/avatar/${taskId}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (response.ok) { // removed data and replaced it with id

		dispatch(removeTask(taskId))
		// return taskId
	}
}



// __________________________________________reducer________________________________________

const initialState = {}
const avatarReducer = (state = initialState, action) => {

	switch (action.type) {

		case LOAD_AVATAR: {
			console.log("%c 🚀 ~ file: avatar.js:128 ~ avatarReducer ~ action: ", "color: chocolate; font-size: 25px", "(LOAD)", action)

			const avatarState = {};

			// action.avatar.Task.forEach(task => {
			// 	avatarState[task.id] = task;
			// });
			return avatarState;
		}

		case POST_AVATAR: {
			console.log("%c 🚀 ~ file: avatar.js:139 ~ avatarReducer ~ action: ", "color: chocolate; font-size: 25px", "(POST)", action)
			return { ...state, [action.avatar.id]: action.avatar };
		}

		case UPDATE_AVATAR: {
			return { ...state, [action.avatar.id]: action.task };
		}

		default:
			return state;
	}

}




export default avatarReducer;
