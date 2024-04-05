import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import './CreateTask.css';
import { thunkCreateTask, thunkLoadTasks } from '../../store/task';


function CreateTask() {


	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [notes, setNotes] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [dueDate, setDueDate] = useState('');
	const { closeModal } = useModal();
	const [checklist, setChecklist] = useState([]);

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

		let newTask = {

			title,
			notes,
			// checklist,
			difficulty,
			dueDate,
		};


		const submissionResults = await dispatch(thunkCreateTask(newTask));

		// console.log("%c 🚀 ~ file: CreateTask.jsx:52 ~ handleSubmit ~ submissionResults: ", "color: red; font-size: 25px", submissionResults)


		if (!submissionResults?.errors) {
			console.log("SUBMISSION ID: ", submissionResults.id)

		} else {
			return submissionResults.errors
		}

		await dispatch(thunkLoadTasks());

		closeModal();

	};


	return (
		<>
			<form onSubmit={handleSubmit}
				// ref={ufRef}
				className="post-task-modal"
			>
				<label className="pt-task-label" htmlFor="title">
					<h4>
						Title
					</h4>
					<input
						className="pt-task-input"
						type="text"
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
				<button type="submit" className="pt-task-submit-button submit">
					Save
				</button>
			</form>
		</>
	)
}


export default CreateTask;
