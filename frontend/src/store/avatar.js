// import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_AVATAR = 'avatar/LOAD_AVATAR';
// export const LOAD_CURRENT_AVATAR = 'avatar/LOAD_CURRENT_AVATAR';
export const POST_AVATAR = 'avatar/POST_AVATAR';
// export const UPDATE_AVATAR = 'avatar/UPDATE_AVATAR';
// export const REMOVE_AVATAR = 'avatar/REMOVE_AVATAR';
// for task completion status
// export const UPDATE_AVATAR_STATUS = 'avatar/UPDATE_AVATAR_STATUS';

// /**  Action Creators: */

export const loadAvatar = (avatar) => ({
	type: LOAD_AVATAR,
	avatar
});



export const createAvatar = (data) => ({
	type: POST_AVATAR,
	data
});


// export const editAvatar = (taskId, task) => ({
// 	type: UPDATE_AVATAR,
// 	taskId, task
// });



// /** Thunk Action Creators: */

//* load avatar
export const thunkLoadAvatar = (id, avatarData) => async dispatch => {

console.log("%c 🚀 ~ file: avatar.js:39 ~ thunkLoadAvatar ~ id: ", "color: red; font-size: 25px", id)


	console.log("%c 🚀 ~ file: avatar.js:39 ~ thunkLoadAvatar ~ avatar: ", "color: magenta; font-size: 30px", avatarData)


	const response = await fetch(`/api/avatar/${id}`);


	// console.log("%c 🚀 ~ file: avatar.js:44 ~ thunkLoadAvatar ~ response: ", "color: cyan; font-size: 25px", response)


	if (response.ok) {
		const avatar = await response.json();

		await dispatch(loadAvatar(avatar))

		return avatar

	} else {
		const errorResponse = await response.json()
		return errorResponse
	}
}

// //* create / post avatar
export const thunkCreateAvatar = (avatarData) => async (dispatch) => {

	console.log("%c 🚀 ~ file: avatar.js:62 ~ thunkCreateAvatar ~ avatarData: ", "color: red; font-size: 25px", avatarData)



	const response = await fetch('/api/avatar/create', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(avatarData)
	})

	console.log("%c 🚀 ~ file: avatar.js:76 ~ thunkCreateAvatar ~ response: ", "color: red; font-size: 25px", response)

	if (!response.ok) {
		const errResponse = await response.json();
		return errResponse;
	}

	const data = await response.json();

	console.log("%c 🚀 ~ file: avatar.js:76 ~ thunkCreateAvatar ~ data: ", "color: red; font-size: 25px", data)
	dispatch(createAvatar(data.avatar))
	return data.avatar.imageUrl;

}

// // edit avatar
// export const thunkEditAvatar = (taskId, task) => async (dispatch) => {


// 	const response = await csrfFetch(`/api/avatar/${taskId}`, {
// 		method: 'PUT',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(task)
// 	})


// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(editAvatar(data));
// 		return data
// 	} else {
// 		const errorResponse = await response.json();
// 		return errorResponse;
// 	}
// }


// __________________________________________reducer________________________________________

const initialState = {}
const avatarReducer = (state = initialState, action) => {

	switch (action.type) {

		case LOAD_AVATAR: {
			console.log("%c 🚀 ~ file: avatar.js:128 ~ avatarReducer ~ action: ", "color: tomato; font-size: 25px", "(LOAD)", action)

			const avatarState = { ...state };

			// action.avatar.Task.forEach(task => {
			// 	avatarState[task.id] = task;
			// });
			avatarState[action.avatar.id] = action.avatar;
			return avatarState;
		}

		case POST_AVATAR: {
			console.log("%c 🚀 ~ file: avatar.js:139 ~ avatarReducer ~ action: ", "color: chocolate; font-size: 28px", "(POST)", action)
			const postState = { ...state, ...action.data };

			console.log("%c 🚀 ~ file: avatar.js:136 ~ avatarReducer ~ postState: ", "color: red; font-size: 25px", postState)


			return postState;
		}

		default:
			return state;
	}

}




export default avatarReducer;
