import { thunkLoadTasks } from '../../store/task';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './AllTasks.css';
import EditTask from './EditTask';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import OpenModalButton from '../Navigation/OpenModalMenuItem';
import CreateTask from './CreateTask';
import DeleteTask from './DeleteTask';






function AllTasks() {
	const dispatch = useDispatch();
	const { taskId } = useParams();

	console.log("%c 🚀 ~ file: AllTasks.jsx:18 ~ AllTasks ~ taskId: ", "color: red; font-size: 25px", taskId)

	// console.log("%c 🚀 ~ file: AllTasks.jsx:17 ~ AllTasks ~ tasks: ", "color: red; font-size: 25px", tasks)
	// const [hover, setHover] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	// const navigate = useNavigate();
	// const ulRef = useRef(null);

	const tasks = useSelector(state => state.task);
	const allTasks = Object.values(tasks)
	console.log("%c 🚀 ~ file: AllTasks.jsx:23 ~ AllTasks ~ allTasks: ", "color: red; font-size: 25px", allTasks)

	const toggleMenu = () => {
		// e.stopPropagation();

		setShowMenu(!showMenu)
	};
	// const closeMenu = () => setShowMenu(false);


	// const onHover = (index) => {
	// 	setHover(index)
	// };

	// const hovering = () => {
	// 	setHover(null);
	// }

	useEffect(() => {
		dispatch(thunkLoadTasks())

	}, [dispatch])

	return (
		<>
			<section className='outer-task-container'>
				<div className='inner-task-container'>
					<div className='avatar-nav'>
						[INSERT AVATAR STATS HERE]
					</div>
					<div className='task-add-task'>
						<OpenModalButton
							itemText={"Add a new Task"}
							onItemClick={toggleMenu}
							modalComponent={<CreateTask
								allTasks={allTasks} />}
						/>
					</div>
					<div className='all-task-container'
						key={tasks.Title}
					>
						{allTasks.length && allTasks?.map((task, index) => (
							<>

								<div className='at-tasks' key={task.id}>
									<OpenModalMenuItem
										className="task-modal"
										itemText={task.title}
										onItemClick={toggleMenu}
										modalComponent={
											<EditTask task={task} />
										}
									/>
									<OpenModalButton
										itemText={<i className="fa-solid fa-trash" />}
										onItemClick={toggleMenu}
										modalComponent={<DeleteTask taskId={task.id} />}
									/>
								</div>
							</>
						))}
					</div>
				</div>
			</section >
		</>
	)

}


export default AllTasks;
