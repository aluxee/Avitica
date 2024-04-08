import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_STATS = 'stats/LOAD_STATS';
export const LOAD_CURRENT_STATS = 'stats/LOAD_CURRENT_STATS';
// export const POST_TASK = 'stats/POST_TASK';
// export const UPDATE_TASK = 'stats/UPDATE_TASK';
// export const REMOVE_TASK = 'stats/REMOVE_TASK';


// /**  Action Creators: */

export const loadStats = (stats) => ({
	type: LOAD_STATS,
	stats
});

export const loadCurrentStats = (stat) => {

	return {

		type: LOAD_CURRENT_STATS,
		stat
	}
};

// export const createTask = (task) => ({
// 	type: POST_TASK,
// 	task
// });


// export const editTask = (task) => ({
// 	type: UPDATE_TASK,
// 	task
// });


// export const removeTask = (taskId) => {
// 	return {
// 		type: REMOVE_TASK,
// 		taskId
// 	}
// };


// /** Thunk Action Creators: */
// LOAD stats GOLD
// //* load all stats info
export const thunkLoadStats = () => async dispatch => {
	const response = await csrfFetch('/api/stats');

	const data = await response.json();
	if (response.ok) {
		dispatch(loadStats(data))
		return data;
	} else {
		const errorResponse = await response.json()
		return errorResponse
	}


}

// //* load current task
export const thunkLoadCurrentStats = () => async dispatch => {

	const response = await csrfFetch(`/api/stats/current`);

	const data = await response.json();
	if (response.ok) {

		const statData = dispatch(loadCurrentStats(data))
		return statData;

	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}

}

// // //* create / post a task
// export const thunkCreateTask = (task) => async (dispatch) => {

// 	console.log("%c 🚀 ~ file: task.js:123 ~ thunkCreateTask ~ task: ", "color: blue; font-size: 25px", " FIRST PART OF THE CREATE TASK THUNK ", task)


// 	const response = await csrfFetch('/api/stats/new', {
// 		method: 'POST',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(task)
// 	})

// 	const data = await response.json();
// 	if (data.errors) {
// 		const errorResponse = await response.json()
// 		return errorResponse
// 	} else {
// 		const taskData = await dispatch(createTask(data))
// 		return taskData
// 	}
// }

// // edit a task
// export const thunkEditTask = (task, taskId) => async (dispatch) => {


// 	const response = await csrfFetch(`/api/stats/${taskId}`, {
// 		method: 'PUT',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(task)
// 	})


// 	const data = await response.json();

// 	console.log("%c 🚀 ~ file: task.js:164 ~ thunkEditTask ~ data: ", "color: blue; font-size: 25px", data)

// 	if (data.errors) {
// 		const errorResponse = await response.json()
// 		return errorResponse;
// 	} else {
// 		await dispatch(editTask(data))
// 		return data;
// 	}
// if (data.) {
// 	const updatedTask = await response.json();

// 	console.log("%c 🚀 ~ file: task.js:166 ~ thunkEditTask ~ updatedTask: ", "color: cyan; font-size: 25px", "BEFORE", updatedTask)


// 	dispatch(editTask(updatedTask))
// 	console.log("%c 🚀 ~ file: task.js:179 ~ thunkEditTask ~ updatedTask: ", "color: cyan; font-size: 25px", "AFTER", updatedTask)

// 	return updatedTask

// } else {
// 	const errorResponse = await response.json();

// 	return errorResponse
// }
// }


// // //* delete/remove a task
// export const thunkRemoveTask = (taskId) => async dispatch => {

// 	console.log("%c 🚀 ~ file: task.js:174 ~ thunkRemoveTask ~ taskId: ", "color: cyan; font-size: 25px", taskId)


// 	const response = await csrfFetch(`/api/stats/${taskId}`, {
// 		method: 'DELETE',
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	});

// 	if (response.ok) { // removed data and replaced it with id

// 		dispatch(removeTask(taskId))
// 		return taskId
// 	}
// }




// __________________________________________reducer________________________________________

const initialState = {}
const statsReducer = (state = initialState, action) => {

	// stats are an object of array of objects

	switch (action.type) {

		case LOAD_STATS: {
			console.log("%c 🚀 ~ file: stats.js:184 ~ statsReducer ~ action: ", "color: blue; font-size: 25px", action, action.stats.Stats)

			const allStats = { ...state };
			allStats[action.stats.Stats.id] = action.stats.Stats

			return allStats;
		}

		default:
			return state;
	}

}


export default statsReducer;
