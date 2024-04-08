import { thunkLoadTasks, thunkRemoveTask } from '../../store/task';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './AllTasks.css';
// import EditTask from './EditTask';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateTask from './CreateTask';
import DeleteTask from './DeleteTask';
import Task from './Task';


function AllTasks() {
	const dispatch = useDispatch();
	// console.log("%c 🚀 ~ file: AllTasks.jsx:17 ~ AllTasks ~ tasks: ", "color: red; font-size: 25px", tasks)
	// const [hover, setHover] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	const taskObj = useSelector(state => state.task);

	// console.log("%c 🚀 ~ file: AllTasks.jsx:23 ~ AllTasks ~ taskObj: ", "color: red; font-size: 25px", taskObj)

	const [filteredTasks, setFilteredTasks] = useState([]);
	const [taskStatus, setTaskStatus] = useState(false);
	const allTasks = Object.values(taskObj)

	console.log("%c 🚀 ~ file: AllTasks.jsx:24 ~ AllTasks ~ allTasks: ", "color: red; font-size: 25px", allTasks)


	// const [taskText, setTaskText] = useState("");
	const [tasks, setTasks] = useState([]);
	//*error fix: tasks cannot disappear on refresh!

	useEffect(() => {
		setTasks(allTasks)

	}, [])
	useEffect(() => {
		dispatch(thunkLoadTasks())
		pullTaskLocal()

		// const storedTasks = JSON.parse(localStorage.getItem('tasks' || '[]'));

		// setTasks(storedTasks)
	}, [dispatch])

	// 1. onclick of checkmark, the task will be set to completed being true
	useEffect(() => {
		handleTaskComplete() // do NOT put it in the dep array
		// lastly save the task
		saveTaskLocal()
	}, [tasks]) // cannot remove dep array either

	// }
	const toggleMenu = () => {
		// e.stopPropagation();

		setShowMenu(!showMenu)
	};
	const handleTaskComplete = async (taskId) => {

		// if (!taskId) {
		// 	console.error('Task ID is undefined');
		// 	return;
		// }
		// e.preventDefault();
		//* careful when utilizing this function, may cause weird behavior in localStorage and the items to go missing

		const tasks = JSON.parse(localStorage.getItem('tasks' || filteredTasks || []));
		//update list of tasks
		// console.log("%c 🚀 ~ file: AllTasks.jsx:70 ~ handleTaskComplete ~ tasks: ", "color: red; font-size: 25px", tasks)
		const updatedTaskList = tasks.filter(task => task.id !== taskId)

		console.log("%c 🚀 ~ file: AllTasks.jsx:68 ~ handleTaskComplete ~ updatedTaskList: ", "color: purple; font-size: 25px", updatedTaskList)

		console.log("%c 🚀 ~ file: AllTasks.jsx:61 ~ handleTaskComplete ~ taskId: ", "color: magenta; font-size: 25px", taskId)


		localStorage.setItem('tasks', JSON.stringify(updatedTaskList))
		setTasks(updatedTaskList)
		// set task completion


		// setFilteredTasks(completedTask)
		// // actually remove the task here:
		// await dispatch(thunkRemoveTask(completedTask.id))
		//set task status to true
		setTaskStatus(true)
		handleExpAndGold()
		await dispatch(thunkLoadTasks())
	}

	const handleExpAndGold = () => {
		//invoke inside handleTaskComplete
	}


	const saveTaskLocal = () => {
		setTasks(currTask => {
			// currTask = currTask || [...allTasks];
			currTask = allTasks || currTask;
			const taskList = [...currTask]

			localStorage.setItem('tasks', JSON.stringify(taskList));
		})
	}
	const pullTaskLocal = (allTasks) => {

		if (localStorage.getItem('tasks') === allTasks) {
			localStorage.setItem('tasks', JSON.stringify('tasks'));
		} else {
			// 	let taskStorage = JSON.parse(localStorage.getItem("tasks"));
			// 	setTasks(taskStorage);
			const storedTasks = JSON.parse(localStorage.getItem('tasks'))
			setTasks(storedTasks)
		}
	}

	const allStoredTasks = JSON.parse(localStorage.getItem('tasks')); // note this may be glitchy to cycle thru due to storage inconsistency

	console.log("%c 🚀 ~ file: AllTasks.jsx:108 ~ allStoredTasks: ", "color: red; font-size: 25px", allStoredTasks)


	return (
		<>
			<section className='ext outer-task-container'>
				<div className='int inner-task-container'>
					<div className='task-add-task'>
						<OpenModalButton
							buttonText={"Add a new task"}
							onItemClick={toggleMenu}
							modalComponent={<CreateTask allTasks={allStoredTasks} />}
						// change allTasks to setTasks
						/>
					</div>
					<div className='all-task-container'
					// key={tasks.id}
					>
						{allTasks.length && allTasks ? allTasks.map((task, index) => (
							<div className='at-tasks'
								key={index}
							//getting unique key issue may be preventing edit from submitting, but delete works
							>
								<div className='task-mark complete'

								>
									<i className="fa-solid fa-check"
										onClick={() => handleTaskComplete(task.id)}
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
								<div className='task-mark incomplete'>
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
			</section >
		</>
	)

}


export default AllTasks;
