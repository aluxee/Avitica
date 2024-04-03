import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import './CreateTask.css';
import { thunkCreateTask, thunkLoadTasks } from '../../store/task';


function CreateTask({ allTasks }) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [dueDate, setDueDate] = useState('');
	const { closeModal } = useModal();
	// const [checklist, setChecklist] = useState(task.Checklist || []);
	const { taskId } = useParams();

	console.log("%c 🚀 ~ file: CreateTask.jsx:22 ~ CreateTask ~ taskId: ", "color: red; font-size: 25px", taskId)

	const [errors, setErrors] = useState({});
	// const [showMenu, setShowMenu] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (title.length <= 3) {
			setErrors({ title: "Title's name is required" });
			return;
		} else if (title.length > 50) {
			setErrors({ title: "Title's name must be shorter than 50 characters long." });
			return;
		}

		const newTask = {
			title,
			description,
			// checklist,
			difficulty,
			dueDate,
		};

		const res = await dispatch(thunkCreateTask(newTask));

		if (res && res.errors) {
			return setErrors(res.errors);
		}
		closeModal();

		// setEditing(false);
		dispatch(thunkLoadTasks());
	};

	// const hoverClassName = "hover" + (hoverCaption !== null ? "" : "hidden");


	return (
		<>
			<form onSubmit={handleSubmit}
				// ref={ufRef}
				className="post-task-modal"
			>
				<label className="pl-task-label" htmlFor="title">
					<h4>
						Title
					</h4>
					<input
						className="pl-task-input"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter Title for Task"
					// onClick={(e) => e.stopPropagation()}
					/>
					{errors?.title && <p className="p-error">{errors.title} </p>}
				</label>
				<label htmlFor="description">
					<h4>
						Description
					</h4>
					<textarea name="description" id="et-description" cols="50" rows="10"
						placeholder="Describe Task"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					>
					</textarea>
					{errors?.description && (
						<p className="p-error">{errors.description} </p>
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
				<button type="submit" className="pl-task-submit-button">
					Save
				</button>
			</form>
		</>
	)
}


export default CreateTask;
