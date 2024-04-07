import { useDispatch } from 'react-redux';
import OpenModalButton from '../Navigation/OpenModalMenuItem';
// import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
// import Checklist from './Checklist/Checklist';
import { thunkEditTask, thunkLoadCurrentTask, } from '../../store/task';
import { useSelector } from 'react-redux';
import './Task.css';
import EditTask from './EditTask';

function Task({ task, taskId, index }) {
	// const ulRef = useRef(null);
	const dispatch = useDispatch();
	// const { closeModal } = useModal();
	const theState = useSelector(state => state.task);

	console.log("%c 🚀 ~ file: Task.jsx:17 ~ Task ~ theState: ", "color: orange; font-size: 30px", theState)


	const taskState = useSelector(state => state.task[taskId]);

	console.log("%c 🚀 ~ file: Task.jsx:13 ~ Task ~ taskState: ", "color: limegreen; font-size: 25px", taskState)

	const [title, setTitle] = useState(task.title);
	// const [checklist, setChecklist] = useState([taskState.Checklist]);

	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);
	const [editTitle, setEditTitle] = useState(false);

	useEffect(() => {
		if (taskState?.title) {
			setTitle(taskState.title);
		}
	}, [dispatch, taskState]);


	const handleSubmit = async (e) => {
		e.preventDefault();

		if (title.length <= 3) {
			setErrors({ title: "Title's name is required" });
			return;
		} else if (title.length > 50) {
			setErrors({ title: "Title's name must be shorter than 50 characters long." });
			return;
		}

		const editUserTask = {
			title,
		};

		// const submissionResults = await dispatch(thunkEditTask(editUserTask, task.id));
		const res = await dispatch(thunkEditTask(editUserTask, task.id));

		if (res && res.errors) {
			return setErrors(res.errors);
		}


		// if (submissionResults.errors) {
		// 	setErrors(submissionResults.errors)
		// 	return setErrors(submissionResults.errors)
		// }
		dispatch(thunkLoadCurrentTask(task.id))
		setEditTitle(false)
	}

	const toggleMenu = () => {
		// e.stopPropagation();

		setShowMenu(!showMenu)
	};


	return (
		<>
			<div className='task-container'>
				<OpenModalButton
					className="task-modal"
					itemText={"Edit Task"}
					onItemClick={toggleMenu}
					modalComponent={
						<EditTask task={task} key={task.id} taskId={taskId} index={index} />
					}
				/>
				<label htmlFor="title">
					<h4>
						Title
					</h4>
					<div className='title'>
						{editTitle === false ?
							<div
								onDoubleClick={() => setEditTitle(true)}
							>
								{title}
							</div>
							:
							<form onSubmit={handleSubmit}>
								<label htmlFor="title">
									<input
										value={title}
										type='text'
										onChange={(e) => setTitle(e.target.value)}
										// onBlur={handleSubmit}
										placeholder="Enter Title for Task"
									/>
									{errors?.title && <p className="p-error">{errors.title} </p>}
								</label>
							</form>
						}
					</div>

				</label>
				<label htmlFor="notes">
					<h4>
						Notes
					</h4>
					<div className='notes'>
						{task.notes !== null ?
							<>
								{task.notes}
							</>
							:
							<>
								Add Notes
							</>}
					</div>
				</label>

				<label htmlFor="difficulty">
					<h4>
						Difficulty
					</h4>
					<div className='difficulty'>
						{task.difficulty}
					</div>
				</label>

				<label htmlFor="dueDate">
					<h4>
						Due Date
					</h4>
					<div className='dueDate'>
						{task.dueDate}
					</div>
				</label>

				<label htmlFor="checklist"
					className='et-checklist'
				>
					{/* <h4>
						Checklist
					</h4> */}
					{/* {checklist && checklist.length > 0 ?

						<Checklist taskId={taskId} checklist={checklist} setChecklist={setChecklist} />
						:
						<>
							Create a checklist!
						</>
					} */}
				</label>

			</div>
		</>
	)
}



export default Task;
