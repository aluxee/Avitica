import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import Checklist from './Checklist/Checklist';
import { thunkEditTask, thunkLoadCurrentTask, thunkRemoveTask, thunkLoadTasks } from '../../store/task';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

import './Task.css';
function Task({ task, taskId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const taskState = useSelector(state => state.task[taskId]);

	console.log("%c 🚀 ~ file: Task.jsx:13 ~ Task ~ taskState: ", "color: limegreen; font-size: 25px", taskState)

	const [title, setTitle] = useState(task.title);

	console.log("%c 🚀 ~ file: Task.jsx:20 ~ Task ~ task: ", "color: red; font-size: 25px", task)

	const [notes, setNotes] = useState(task.notes); // Initialize with task.notes
	const [difficulty, setDifficulty] = useState(task.difficulty);
	const [dueDate, setDueDate] = useState(task.dueDate);
	const [checklist, setChecklist] = useState(task.Checklist)

	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);
	const [editTitle, setEditTitle] = useState(false);
	const [editNotes, setEditNotes] = useState(false);
	const [editDifficulty, setEditDifficulty] = useState(false);
	const [editDueDate, setEditDueDate] = useState(false);

	useEffect(() => {
		const errorsObject = {};
		title.length === 0 ? errorsObject.title = 'Title is required' : title
		title.length <= 3 ? errorsObject.title = 'Title name must be at least 3 characters' : title
		title.length >= 50 ? errorsObject.title = 'Title name must be less than 50 characters' : title

		notes.length >= 100 ? errorsObject.notes = 'Mayhap consider shortening this?' : notes

		const currentDate = new Date();
		const selectedDate = new Date(dueDate);
		if (selectedDate < currentDate) {
			errorsObject.dueDate = 'Due date must be on or after the current date'
		}

		setErrors(errorsObject);
	}, [title, dueDate, notes]);
	// Update the notes state when editNotes becomes true

	useEffect(() => {
		dispatch(thunkLoadCurrentTask(taskId))

	}, [dispatch, taskId])

	const prevTask = task;
	useEffect(() => {
		if (prevTask) {

			setTitle(prevTask.title);
			setNotes(prevTask.notes);
			setDifficulty(prevTask.difficulty);
			setDueDate(prevTask.dueDate);

		}
	}, [prevTask])

	const handleSubmit = async (e) => {
		e.preventDefault();


		const editUserTask = {
			title,
			notes, // using curr notes state
			difficulty,
			dueDate
		};


		const submissionResults = await dispatch(thunkEditTask(editUserTask, taskId));

		// console.log("%c 🚀 ~ file: Task.jsx:85 ~ handleSubmit ~ submissionResults: ", "color: magenta; font-size: 25px", submissionResults)


		if (submissionResults.errors) {
			setErrors(submissionResults.errors)
			return setErrors(submissionResults.errors)
		} else {
			//reset edit state
			setEditTitle(false)
			setEditNotes(false)
			setEditDifficulty(false)
			setEditDueDate(false)
		}

		dispatch(thunkLoadCurrentTask(taskId))

	}


	const handleChangeTitle = (e) => {
		const newTitle = e.target.value;
		if (newTitle.length >= 50) {
			// If the length exceeds the limit, truncate the title
			setTitle(newTitle.slice(0, 50));
			setErrors({ title: "Title name must be less than 50 characters" });
		} else {
			setTitle(newTitle);
			setErrors({ title: '' });
		}
	};

	const handleDelete = async () => {
		const confirmDelete = window.confirm("Are you sure you want to delete this task?");

		if (confirmDelete) {

			const res = await dispatch(thunkRemoveTask(taskId));
			if (res && res.errors) {
				return res.errors;
			}
			await dispatch(thunkLoadTasks())
		}
		closeModal();
	}

	const toggleMenu = (e) => {
		e.stopPropagation();
		setShowMenu(!showMenu)
	};
	return (
		<>
			<div className='task-container'>
				<div className='debrief'>
					Double click a section to edit!
				</div>
				<div className='title-container'>
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
							<form onSubmit={handleSubmit}
								onClick={toggleMenu}
							>
								<label htmlFor="title">
									<input
										value={title}
										type='text'
										onChange={handleChangeTitle}
										// onBlur={handleSubmit}
										placeholder="Enter Title for Task"
									/>
									<p className="p-error">{errors?.title}</p>
								</label>
							</form>}
					</div>
				</div>
				<div className='notes-container'>
					<h4>
						Notes
					</h4>
					<div className='notes'>
						{editNotes === false ?
							<div
								onDoubleClick={() => setEditNotes(true)}
							>
								{notes ? <>{notes}</> : <>Create some notes for this task!</>}
								{/* <button
									onClick={() => setEditNotes(true)}
								>
									Edit Notes
								</button> */}
							</div>
							:
							<form onSubmit={handleSubmit}>
								<label htmlFor="notes" id='notes-label'>
									<textarea
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
										type='text'
										name="notes"
										id="et-notes" cols="35" rows="10"
										placeholder="Type notes here" />

									<p className="p-error">{errors?.notes}</p>
								</label>
								<button type="submit">Save</button>
								<button
									onClick={() => setEditNotes(false)}
									type="submit"
								>
									Cancel
								</button>
							</form>}
					</div>
				</div>

				<div className='diff-container'>
					<h4>
						Difficulty
					</h4>
					{editDifficulty === false ?
						<div
							onDoubleClick={() => setEditDifficulty(true)}
						>
							{difficulty}
						</div>
						:
						<form onSubmit={handleSubmit}>
							<label htmlFor="difficulty">
								<select
									value={difficulty}
									onChange={(e) => setDifficulty(e.target.value)}
									id="difficulty-select"
								>
									<option value="Trivial"
									>Trivial</option>
									<option
										value="Easy">Easy</option>
									<option value="Medium">Medium</option>
									<option value="Hard">Hard</option>
								</select>
							</label>
							<button type="submit">Save</button>
							<button onClick={() => setEditDifficulty(false)} type="submit">Cancel</button>
						</form>}
				</div>

				<div className='dueDate-container'>
					<h4>
						Due Date
					</h4>
					<div className='dueDate'>
						{editDueDate === false ?
							<div
								onDoubleClick={() => setEditDueDate(true)}
							>
								{dueDate}
							</div>
							:
							<form
								onSubmit={handleSubmit}
								className='form-dueDate'
							>
								<label htmlFor="dueDate" className='dueDate-label'>
									<input
										value={dueDate}
										onChange={(e) => setDueDate(e.target.value)}
										type='date'
									/>
									<div className='dueDate-buttons'>
										<button type="submit">Save</button>
										<button onClick={() => setEditDueDate(false)} type="submit">Cancel</button>
									</div>
									<p className="p-error">{errors?.dueDate}</p>
								</label>
							</form>
						}
					</div>
				</div>

				<label htmlFor="checklist"
					className='et-checklist'
				>
					<h4>
						Checklist
					</h4>
					{checklist && checklist.length > 0 ?

						<Checklist taskId={taskId} checklist={checklist} setChecklist={setChecklist} />
						:
						<>
							<OpenModalMenuItem
								className="checklist-modal"
								itemText={"Create a Checklist!"}
								onItemClick={toggleMenu}
							// modalComponent={}
							//TODO: ADD MODAL COMPONENT TO CREATE CHECKLIST
							/>

						</>
					}
				</label>
			</div>

			{/* TASK COMPONENT ENDS HERE*/}
			<button
				onClick={handleDelete}
			>
				<i className="fa-solid fa-trash" />
			</button>
		</>
	)
}



export default Task;
