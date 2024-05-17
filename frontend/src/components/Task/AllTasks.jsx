import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from "react";
import { thunkEditTask, thunkLoadTasks, thunkRemoveTask } from '../../store/task';
import { thunkLoadUserStats, thunkUpdateTaskStatus } from '../../store/userStats';
import './AllTasks.css';

import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateTask from './CreateTask';
import Task from './Task';
import { LoggedContext } from '../../context/LoggedProvider';



function AllTasks() {

	const location = useLocation();
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const { user } = useContext(LoggedContext);

	const taskObj = useSelector(state => state.task);

	// console.log("%c 🚀 ~ file: AllTasks.jsx:27 ~ AllTasks ~ taskObj: ", "color: red; font-size: 25px", taskObj)


	const allTasks = Object.values(taskObj); //an array of all the tasks

	// console.log("%c 🚀 ~ file: AllTasks.jsx:24 ~ AllTasks ~ allTasks: ", "color: orange; font-size: 25px", allTasks)


	// * -------------GOLD SECTION------------- *

	// save the local storage amt to state
	const [gold, setGold] = useState('');

	// console.log("%c 🚀 ~ file: AllTasks.jsx:43 ~ AllTasks ~ gold: ", "color: tomato; font-size: 25px", gold)

	// console.log("%c 🚀 ~ file: AllTasks.jsx:45 ~ allStoredTasks: ", "color: orange; font-size: 25px", storedGold)
	// useEffect handling

	const goldRef = useRef(gold);

	// console.log("%c 🚀 ~ file: AllTasks.jsx:53 ~ AllTasks ~ goldRef: ", "color: red; font-size: 25px", goldRef)

	useEffect(() => {
		goldRef.current = gold
	}, [gold])



	//function that handles upon clicking completion for the task, to handle the dispatch and math



	// * -------------TASK SECTION------------- *


	const [tasks, setTasks] = useState(allTasks);
	const [currTask, setCurrTask] = useState('');


	// * -------------USER INFO SECTION------------- *
	// const userInfo = user.userStats


	//* HANDLE ALL SECTIONS FUNCTIONS

	//function that handles upon clicking completion for the task, to handle the dispatch and math

	const handleTaskComplete = async (task, taskId) => {

		// //task completion useState
		task.completed = true
		// setTaskComplete(task.completed)
		if (taskId) {

			await dispatch(thunkEditTask(task, taskId))

			// console.log("HEY THERE")
			// //task handle gold and exp

			const updatedUserStats = await dispatch(thunkUpdateTaskStatus(taskId))
			// console.log("HEY WORLD!")

			if (updatedUserStats && updatedUserStats.userStats) {
				const results = await dispatch(thunkLoadUserStats())
				user.userStats = results.userStats

				const newGold = user.userStats.gold

				setGold(newGold)
				localStorage.setItem('gold', newGold.toString())


			}

			// //remove task after its been updated
			await dispatch(thunkRemoveTask(taskId))

			// Remove the completed task from the list of tasks
			const filteredTasks = allTasks.filter(task => task.id !== taskId);
			setTasks(filteredTasks);


			// // loads current list of tasks
			await dispatch(thunkLoadTasks()) // effectively deleting live with this catch-all thunk
		}

	}

	const handleTaskIncomplete = async (task, taskId) => {

		// //task completion useState
		task.completed = false
		// setTaskComplete(task.completed)
		if (taskId) {

			await dispatch(thunkEditTask(task, taskId))

			// console.log("HEY THERE")
			// //task handle gold and exp

			const updatedUserStats = await dispatch(thunkUpdateTaskStatus(taskId))
			// console.log("HEY WORLD!")

			if (updatedUserStats && updatedUserStats.userStats) {
				const results = await dispatch(thunkLoadUserStats())
				user.userStats = results.userStats

			}

			// //remove task after its been updated
			await dispatch(thunkRemoveTask(taskId))

			// Remove the completed task from the list of tasks
			const filteredTasks = allTasks.filter(task => task.id !== taskId);
			setTasks(filteredTasks);


			// // loads current list of tasks
			await dispatch(thunkLoadTasks()) // effectively deleting live with this catch-all thunk
		}
	}

	//* useEffect handling

	useEffect(() => {
		setTasks(allTasks)

	}, [currTask]) // do not put allTasks in dependency-- do not change

	const completionHandler = (taskId) => {
		const handleTask = allTasks.filter(task => task.id === taskId)

		setCurrTask(handleTask)

		handleTaskComplete(handleTask, taskId)
		const filteredTasks = allTasks.filter(task => (task.id !== taskId) || (task.id !== handleTask.id))

		setTasks(filteredTasks)

		return filteredTasks
	}

	const incompletionHandler = (taskId) => {
		const handleTask = allTasks.filter(task => task.id === taskId)

		setCurrTask(handleTask)

		handleTaskIncomplete(handleTask, taskId)
		const filteredTasks = allTasks.filter(task => (task.id !== taskId) || (task.id !== handleTask.id))

		setTasks(filteredTasks)

		return filteredTasks
	}

	//need to have refresh upon handleTask
	useEffect(() => {
		completionHandler(); // no need to pass in anything, do not pass in dep array
		dispatch(thunkLoadTasks())

	}, [dispatch, location, gold, user.userStats, user])

	useEffect(() => {
		incompletionHandler(); // no need to pass in anything, do not pass in dep array
		dispatch(thunkLoadTasks())

	}, [dispatch, location, gold, user.userStats, user])

	const toggleMenu = () => {
		// e.stopPropagation();

		setShowMenu(!showMenu)
	};

	// console.log('tasks', tasks)

	return (
		<>
			<div className='ext outer-task-container'>
				<div className='int inner-task-container'>
					<div className='task-add-task'>
						<OpenModalButton
							buttonText={"Add a new task"}
							onItemClick={toggleMenu}
							modalComponent={<CreateTask allTasks={tasks} />}
						// change allTasks to setTasks
						/>
					</div>
					<div className='all-task-container'
					// key={tasks.id}
					>
						{allTasks.length && allTasks ? allTasks.map((task, index) => (
							<div className='at-tasks'
								key={index}
							>
								<div className='task-mark complete'
								// onClick={() => alert('Points feature coming soon!')}

								>
									<i className="fa-solid fa-check"
										onClick={() => handleTaskComplete(task, task.id)}
									/>
								</div>
								<div className='task-div'>

									<OpenModalMenuItem
										className="task-modal"
										itemText={task.title}
										onItemClick={toggleMenu}
										modalComponent={
											<Task task={task} key={index} taskId={task.id} index={index}
											/>
										}
									/>

								</div>
								<div className='task-mark incomplete'
								>
									<i className="fa-solid fa-xmark"
										onClick={() => handleTaskIncomplete(task, task.id)}
									/>
								</div>
							</div>
						))
							: <div className='no-task-no-class'>
								Create a Task Today!
							</div>
						}
					</div>
				</div>
			</div >
		</>
	)

}


export default AllTasks;
