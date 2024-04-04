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
export const thunkCreateTask = (task) => async (dispatch) => {

	console.log("%c 🚀 ~ file: task.js:123 ~ thunkCreateTask ~ task: ", "color: blue; font-size: 25px", " FIRST PART OF THE CREATE TASK THUNK ", task)


	const response = await csrfFetch('/api/tasks/new', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task)
	})

	const data = await response.json();
	if (data.errors) {
		const errorResponse = await response.json()
		return errorResponse
	} else {
		const taskData = await dispatch(createTask(data))
		return taskData
	}
}

// edit a task
export const thunkEditTask = (task, taskId) => async (dispatch) => {


	const response = await csrfFetch(`/api/tasks/${taskId}`, {
		method: 'PUT',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task)
	})


	const data = await response.json();

	// console.log("%c 🚀 ~ file: task.js:164 ~ thunkEditTask ~ data: ", "color: blue; font-size: 25px", data)

	if (data.errors) {
		const errorResponse = await response.json()
		return errorResponse;
	} else {
		await dispatch(editTask(data))
		return data;
	}
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


}


// //* delete/remove a task
export const thunkRemoveTask = (taskId) => async dispatch => {

	console.log("%c 🚀 ~ file: task.js:174 ~ thunkRemoveTask ~ taskId: ", "color: cyan; font-size: 25px", taskId)


	const response = await csrfFetch(`/api/tasks/${taskId}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (response.ok) { // removed data and replaced it with id

		dispatch(removeTask(taskId))
		return taskId
	}
}




// __________________________________________reducer________________________________________

const initialState = {}
const taskReducer = (state = initialState, action) => {

	// tasks are an object of array of objects

	switch (action.type) {
		case LOAD_TASKS: {
			const allTasksState = {};
			action.tasks.Task.forEach(task => {
				allTasksState[task.id] = task;
			});
			return allTasksState;
		}


		case LOAD_CURRENT_TASK: {
			const currentTaskState = { ...state };

			action.tasks.Task.forEach(task => {
				const newTaskState = { ...task }

				currentTaskState[task.id] = { ...state[task.id], ...newTaskState };

			})
			return currentTaskState;
		}

		case POST_TASK: {
			return { ...state, [action.task.id]: action.task };
		}

		case UPDATE_TASK: {
			return { ...state, [action.task.id]: action.task };
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
