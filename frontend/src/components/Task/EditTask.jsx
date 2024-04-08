import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkEditTask } from '../../store/task';
import './EditTask.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import Checklist from './Checklist/Checklist';
import DeleteTask from './DeleteTask';
//Only available for guidance or future option
function EditTask({ task, taskId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [title, setTitle] = useState(task.title);
	const [notes, setNotes] = useState(task.notes);
	const [difficulty, setDifficulty] = useState(task.difficulty);
	const [dueDate, setDueDate] = useState(task.dueDate);
	const [checklist, setChecklist] = useState(task.Checklist);

	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		const errorsObj = {};
		title.length <= 3 ? errorsObj.title("Title's name is required, please enter at least 3 characters") : ''

		setErrors(errorsObj)
	}, [title])

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (title.length <= 3) {
			setErrors({ title: "Title's name is required" });
			return;
		}
		if (title.length > 50) {
			setErrors({ title: "Title's name must be shorter than 50 characters long." });
			return;
		}

		const editUserTask = {
			title,
			notes,
			checklist,
			difficulty,
			dueDate,
		};

		const submissionResults = await dispatch(thunkEditTask(editUserTask, taskId));

		if (submissionResults.errors) {
			setErrors(submissionResults.errors)
			return setErrors(submissionResults.errors)
		}

		closeModal();


		// await dispatch(thunkLoadTasks())
	}

	const toggleMenu = (e) => {
		e.stopPropagation();

		setShowMenu(!showMenu);
	};


	return (
		<>
			<form
				onSubmit={handleSubmit}
				onClick={toggleMenu}
				className="edit-task-modal"
			>
				<label htmlFor="title">
					<h4>
						Title
					</h4>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter Title for Task"
					/>
					{errors?.title && <p className="p-error">{errors.title} </p>}
				</label>

				<label htmlFor="notes">
					<h4>
						Notes
					</h4>
					<textarea name="notes" id="et-notes" cols="50" rows="10"
						placeholder="Describe Task"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					>
					</textarea>
					{errors?.notes && (
						<p className="p-error">{errors.notes} </p>
					)}
				</label>

				<label htmlFor="difficulty">
					<h4>
						Difficulty
					</h4>
					<select
						value={difficulty}
						onChange={(e) => setDifficulty(e.target.value)}
						id="difficulty-select"
					>
						<option value="Trivial">Trivial</option>
						<option value="Easy">Easy</option>
						<option value="Medium">Medium</option>
						<option value="Hard">Hard</option>
					</select>
				</label>


				<label htmlFor="dueDate">
					<h4>
						Due Date
					</h4>
					<input
						value={dueDate}
						type="date"
						onChange={(e) => setDueDate(e.target.value)}
					/>
					{errors?.dueDate && (
						<p className="p-error">{errors.dueDate} </p>
					)}
				</label>

				<label htmlFor="checklist"
					className='et-checklist'
				>
					<h4>
						Checklist
					</h4>
					{task.id === taskId && task?.Checklist ?
						// BROKEN CHECKLIST CANNOT USE DUE TO Q OF CTRL INPUT
						<Checklist taskId={taskId} checklist={checklist} setChecklist={setChecklist} />
						:
						<>
							Create a checklist!
						</>
					}
				</label>
				<button
					type='submit'
					className='et-task-submit-button submit'>
					Save
				</button>
			</form>
			<div>
				<OpenModalMenuItem
					itemText={<i className="fa-solid fa-trash" />}
					// onItemClick={toggleMenu}
					onItemClick={toggleMenu}
					modalComponent={<DeleteTask taskId={task.id} key={task.id} />}
				/>
			</div>
		</>
	)
}

export default EditTask;
