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
	console.log("START FUNCTION COMPONENT ALLTASKS")
	const location = useLocation();
	const dispatch = useDispatch();
	// console.log("%c 🚀 ~ file: AllTasks.jsx:17 ~ AllTasks ~ tasks: ", "color: red; font-size: 25px", tasks)
	// const [hover, setHover] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	const { user } = useContext(LoggedContext);

	const taskObj = useSelector(state => state.task);

	// console.log("%c 🚀 ~ file: AllTasks.jsx:27 ~ AllTasks ~ taskObj: ", "color: red; font-size: 25px", taskObj)


	const allTasks = Object.values(taskObj); //an array of all the tasks

	// console.log("%c 🚀 ~ file: AllTasks.jsx:24 ~ AllTasks ~ allTasks: ", "color: orange; font-size: 25px", allTasks)


	// * -------------GOLD SECTION------------- *

	// retrieve curr gold amount
	// const storedGold = parseInt(localStorage.getItem('gold'), 10);

	// console.log("%c 🚀 ~ file: AllTasks.jsx:40 ~ AllTasks ~ storedGold: ", "color: red; font-size: 25px", storedGold)


	// save the local storage amt to state
	const [gold, setGold] = useState('');

	console.log("%c 🚀 ~ file: AllTasks.jsx:43 ~ AllTasks ~ gold: ", "color: tomato; font-size: 25px", gold)

	// console.log("%c 🚀 ~ file: AllTasks.jsx:45 ~ allStoredTasks: ", "color: orange; font-size: 25px", storedGold)
	// useEffect handling

	const goldRef = useRef(gold);

	console.log("%c 🚀 ~ file: AllTasks.jsx:53 ~ AllTasks ~ goldRef: ", "color: red; font-size: 25px", goldRef)

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

			// console.log("%c 🚀 ~ file: AllTasks.jsx:94 ~ handleTaskComplete ~ results: ", "color: hotpink; font-size: 25px", results)
			user.userStats = results.userStats

			// console.log("%c 🚀 ~ file: AllTasks.jsx:97 ~ handleTaskComplete ~ user.userStats: ", "color: orange; font-size: 25px", user.userStats, user.userStats)
			const newGold = user.userStats.gold

			// console.log("%c 🚀 ~ file: AllTasks.jsx:99 ~ handleTaskComplete ~ newGold: ", "color: red; font-size: 25px", newGold)

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



	//* useEffect handling

	useEffect(() => {
		setTasks(allTasks)

	}, []) // do not put allTasks in dependency-- do not change

	const completionHandler = (taskId) => {
		const handleTask = allTasks.filter(task => task.id === taskId)

		setCurrTask(handleTask)

		handleTaskComplete(handleTask, taskId)
		const filteredTasks = allTasks.filter(task => (task.id !== taskId) || (task.id !== handleTask.id))

		setTasks(filteredTasks)

		return filteredTasks
	}

	//need to have refresh upon handleTask
	useEffect(() => {
		completionHandler(); // no need to pass in anything, do not pass in dep array
		dispatch(thunkLoadTasks())

	}, [dispatch, location, gold, user.userStats, user])

	const toggleMenu = () => {
		// e.stopPropagation();

		setShowMenu(!showMenu)
	};

console.log('tasks', tasks)

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
						{tasks.length && tasks ? tasks.map((task, index) => (
							<div className='at-tasks'
								key={index}
							>
								<div className='task-mark complete'
									// onClick={() => alert('Points feature coming soon!')}
									onClick={() => handleTaskComplete(task, task.id)}
								>
									<i className="fa-solid fa-check"

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
									onClick={() => alert('Points feature coming soon!')}
								>
									<i className="fa-solid fa-xmark" />
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
