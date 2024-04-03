import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_TASKS = 'tasks/LOAD_TASKS';
export const LOAD_CURRENT_TASK = 'tasks/LOAD_CURRENT_TASK';
export const POST_TASK = 'tasks/POST_TASK';
export const UPDATE_TASK = 'tasks/UPDATE_TASK';
export const REMOVE_TASK = 'tasks/REMOVE_TASK';

// /**  Action Creators: */

export const loadTasks = (tasks) => ({
	type: LOAD_TASKS,
	tasks
});

export const loadCurrentTask = (taskId) => {

	console.log("%c 🚀 ~ file: task.js:19 ~ loadCurrentTasks ~ tasks: ", "color: red; font-size: 25px", task)
	return {

		type: LOAD_CURRENT_TASK,
		taskId
	}
};

export const createTask = (task) => ({
	type: POST_TASK,
	task
});


export const editTask = (task) => ({
	type: UPDATE_TASK,
	task
});


export const removeTask = (taskId) => {
	return {
		type: REMOVE_TASK,
		taskId
	}
};



// /** Thunk Action Creators: */

//* load all tasks
export const thunkLoadTasks = () => async dispatch => {


	const response = await csrfFetch('/api/tasks');


	if (response.ok) {
		const tasks = await response.json();


		dispatch(loadTasks(tasks))
	} else {
		const errorResponse = await response.json()
		return errorResponse
	}
}

// //* load current task
export const thunkLoadCurrentTask = (taskId) => async dispatch => {

	const response = await csrfFetch(`/api/tasks/${taskId}`);

	if (response.ok) {
		const tasksCurrentData = await response.json();

		console.log("%c 🚀 ~ file: task.js:76 ~ thunkLoadCurrentTasks ~ tasksCurrentData: ", "color: red; font-size: 25px", tasksCurrentData)


		dispatch(loadCurrentTask(tasksCurrentData))
		return tasksCurrentData;

	} else {
		const errorResponse = await response.json();
		return errorResponse;
	}

}

// //* create / post a task
// export const thunkCreateTask = (task) => async (dispatch) => {

// 	const response = await csrfFetch('/api/tasks', {
// 		method: 'POST',
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(spotData.task)
// 	})

// 	if (response.ok) {

// 		await dispatch(createTask(task))
// 		return task

// 	} else {
// 		const errorResponse = await response.json()
// 		return errorResponse
// 	}
// }

// edit a task
export const thunkEditTask = (task, taskId) => async (dispatch) => {

	const taskId = Number(taskId);


	// see sc for mdn times and sorts
	const response = await csrfFetch(`/api/tasks/${taskId}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task)
	})


	if (response.ok) {
		const updatedTask = await response.json();

		dispatch(editTask(updatedTask))
		return updatedTask

	} else {
		const errorResponse = await response.json();

		return errorResponse
	}
}


// //* delete/remove a task
// export const thunkRemoveTask = (task) => async dispatch => {

// 	const response = await csrfFetch(`/api/tasks/${task.id}`, {
// 		method: 'DELETE',
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	});

// 	if (response.ok) { // removed data and replaced it with id

// 		dispatch(removeTask(task.id))

// 		return task.id
// 	}
// }
//  __________________________________________reducer________________________________________
const initialState = {}
const taskReducer = (state = initialState, action) => {

	// tasks are an object of array of objects

	switch (action.type) {
		case LOAD_TASKS: {
			const allTasksState = { ...state };

			console.log("%c 🚀 ~ file: task.js:190 ~ taskReducer ~ allTasksState: ", "color: red; font-size: 25px", allTasksState)


			action.tasks.Task.forEach(task => {
				let newTaskState = { ...task }
				allTasksState[task.id] = newTaskState;
			});
			return allTasksState;
		};


		case LOAD_CURRENT_TASK: {
			const currentTaskState = { ...state };

			// console.log("%c 🚀 ~ file: task.js:182 ~ taskReducer ~ currentTaskState: ", "color: red; font-size: 25px", currentTaskState)


			action.tasks.Task.forEach(task => {
				const newTaskState = { ...task }

				currentTaskState[task.id] = { ...state[task.id], ...newTaskState };

			})
			return currentTaskState;
		}

		case POST_TASK: {
			const newTaskState = { ...state }

			const newTask = { ...action.task}

			newTaskState[action.task.id] = {
				...newTask
			}

			return newTaskState;

		}

		case UPDATE_TASK: {
			const updatedState = { ...state }

			const newTask = { ...action.task }

			updatedState[newTask.id] = {
				...state[action.task.id], ...newTask
			}

			return updatedState;
		}

		case REMOVE_TASK: {
			const removeState = { ...state };

			delete removeState[action.id];
			return removeState;
		}

		default:
			return state;
	}

}


export default taskReducer;
