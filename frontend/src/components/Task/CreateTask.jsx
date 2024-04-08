import { useState, useEffect } from 'react';
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
	// const [checklist, setChecklist] = useState([]);

	const [errors, setErrors] = useState({});
	// const [showMenu, setShowMenu] = useState(false);

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
	}, [title, dueDate, notes])

	const handleSubmit = async (e) => {
		e.preventDefault();


		const newTask = {

			title,
			notes,
			// checklist,
			difficulty,
			dueDate,
		};


		const submissionResults = await dispatch(thunkCreateTask(newTask));


		if (!submissionResults?.errors) {
			console.log("SUBMISSION ID: ", submissionResults.id)

		} else {
			return submissionResults.errors
		}

		await dispatch(thunkLoadTasks());

		closeModal();

	};

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
						onChange={handleChangeTitle}
						placeholder="Enter Title for Task"
					/>
					<p className="p-error">{errors?.title}</p>
				</label>
				<label htmlFor="notes">
					<h4>
						Notes
					</h4>
					<textarea name="notes" id="et-notes" cols="35" rows="10"
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
					<p className="p-error">{errors?.dueDate}</p>
				</label>
				<button type="submit" className="pt-task-submit-button submit">
					Save
				</button>
			</form>
		</>
	)
}


export default CreateTask;
