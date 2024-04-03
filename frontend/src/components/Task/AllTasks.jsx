import { thunkLoadTasks } from '../../store/task';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './AllTasks.css';
import EditTask from './EditTask';
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import OpenModalButton from '../Navigation/OpenModalMenuItem';
import CreateTask from './CreateTask';
import DeleteTask from './DeleteTask';



function AllTasks() {
	const dispatch = useDispatch();
	// console.log("%c 🚀 ~ file: AllTasks.jsx:17 ~ AllTasks ~ tasks: ", "color: red; font-size: 25px", tasks)
	// const [hover, setHover] = useState(null);
	const [showMenu, setShowMenu] = useState(false);
	// const navigate = useNavigate();
	// const ulRef = useRef(null);

	const tasks = useSelector(state => state.task);
	const allTasks = Object.values(tasks)

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
							modalComponent={<CreateTask allTasks={allTasks} />}
						/>
					</div>
					<div className='all-task-container'
						key={tasks.id}
					>
						{allTasks.length && allTasks?.map((task) => (
							<div className='at-tasks'
								key={task.id}
								//getting unique key issue may be preventing edit from submitting, but delete works
							>
								<OpenModalButton
									className="task-modal"
									itemText={task.title}
									onItemClick={toggleMenu}
									modalComponent={
										<EditTask task={task} key={task.id} />
									}
								/>
								<OpenModalButton
									itemText={<i className="fa-solid fa-trash" />}
									onItemClick={toggleMenu}
									modalComponent={<DeleteTask taskId={task.id} key={task.id} />}
								/>
							</div>
						))}
					</div>
				</div>
			</section >
		</>
	)

}


export default AllTasks;