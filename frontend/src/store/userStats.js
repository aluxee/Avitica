import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_USER_STATS = 'info/LOAD_USER_STATS'
export const LOAD_MAX_STATS = 'info/LOAD_MAX_STATS';
// export const LOAD_CURRENT_STATS = 'stats/LOAD_CURRENT_STATS';
// export const POST_TASK = 'stats/POST_TASK';
// export const UPDATE_TASK = 'stats/UPDATE_TASK';
// export const REMOVE_TASK = 'stats/REMOVE_TASK';

export const UPDATE_TASK_STATUS = 'tasks/UPDATE_TASK_STATUS';

// /**  Action Creators: */

export const loadCurrStats = (data) => ({
	type: LOAD_USER_STATS,
	data

})

export const loadMaxStats = (data) => ({
	type: LOAD_MAX_STATS,
	data

});


export const updateTaskStatus = (taskId, data) => {
	return {
		type: UPDATE_TASK_STATUS,
		taskId, data
	}
}

export const thunkLoadUserStats = () => async (dispatch) => {
	const response = await csrfFetch(`/api/info`)
	if (response.ok) {
		const data = await response.json()
		console.log("%c 🚀 ~ file: userStats.js:39 ~ thunkGetUserStats ~ data: ", "color: green; font-size: 25px", data)
		const newData = dispatch(loadCurrStats(data))

		console.log("%c 🚀 ~ file: userStats.js:42 ~ thunkLoadUserStats ~ newData: ", "color: red; font-size: 25px", newData)

		return data
	} else {
		const errResponse = await response.json()
		return errResponse
	}

}

// retrieve max health and exp based on level
export const thunkGetMaxStats = (level) => async (dispatch) => {

	const response = await csrfFetch(`/api/info/max-stats/${level}`)
	if (response.ok) {
		const data = await response.json();

		// console.log("%c 🚀 ~ file: userStats.js:36 ~ thunkGetMaxStats ~ maxHp: ", "color: yellow; font-size: 25px", data)

		dispatch(loadMaxStats(data))
	} else {
		const errResponse = await response.json()
		return errResponse
	}
}


// //* update task status
//TODO: maybe check later name: tech updating user status based on the taskId
export const thunkUpdateTaskStatus = (taskId) => async (dispatch) => {


	const response = await csrfFetch(`/api/tasks/${taskId}/status`, {
		method: 'PUT'
	})
	//UNDERSTAND STRUCTURE OF THIS DATA
	const data = await response.json();

	// console.log("%c 🚀 ~ file: userStats.js:45 ~ thunkUpdateTaskStatus ~ data: ", "color: red; font-size: 25px", data)

	if (data.errors) {
		const errorResponse = await response.json()
		return errorResponse
	} else {
		// console.log("%c 🚀 ~ file: userStats.js:48 ~ thunkUpdateTaskStatus ~ taskData: ", "color: red; font-size: 25px", taskData)


		await dispatch(updateTaskStatus(taskId, data))

		return data
	}
}


// __________________________________________reducer________________________________________

const initialState = { userStats: {}, maxHp: null, maxExp: null }
const userStatsReducer = (state = initialState, action) => {

	// stats are an object of array of objects

	switch (action.type) {

		case LOAD_USER_STATS: {
			console.log("%c 🚀 ~ file: userStats.js:105 ~ userStatsReducer ~ action: ", "color: aqua; font-size: 25px", action)
			const userStatState = {}
			// return { ...state, [action.data.userStats.id]: action.data.userStats }
			userStatState[action.data.userStats.id] = action.data.userStats

			return userStatState
		}
		case LOAD_MAX_STATS: {
			// console.log("%c 🚀 ~ file: userStats.js:83 ~ userStatsReducer ~ action: ", "color: red; font-size: 25px", action)
			return { maxHp: action.data.maxStat.maxHp, maxExp: action.data.maxStat.maxExp }
		}

		case UPDATE_TASK_STATUS: {
			// console.log("%c 🚀 ~ file: task.js:1988 ~ taskReducer ~ action: ", "color: red; font-size: 25px", action)
			const userStatsState = {...state}
			return { userStatsState};
		}
		default:
			return state;
	}

}


export default userStatsReducer;
