import { useDispatch } from 'react-redux';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkEditTask } from '../../store/task';
import './EditTask.css';

// import Checklist from './Checklist/Checklist';


function EditTask({ task }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [title, setTitle] = useState(task.title || '');
	const [description, setDescription] = useState(task.description || '');
	const [difficulty, setDifficulty] = useState(task.difficulty || '');
	const [dueDate, setDueDate] = useState(task.dueDate || '');
	// const [checklist, setChecklist] = useState(task.Checklist || []);

	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);

	const taskId = task.id;


	const handleSubmit = async (e) => {
		e.preventDefault();

		const editUserTask = {
			title,
			description,
			// checklist,
			difficulty,
			dueDate,
		};

		const res = await dispatch(thunkEditTask(editUserTask, taskId));

		if (res && res.errors) {
			return setErrors(res.errors);
		}
		closeModal();
	};

	const toggleMenu = (e) => {
		e.stopPropagation();

		setShowMenu(!showMenu);
	};


	return (
		<>
			<div className='task-container'>
				<>
					<div className='task-inner-container'>
						<div className='task-banner'>
							<h3 className='h3-title'>Edit:</h3>
							<h3 className='h3-filler'>
								{task.title}
							</h3>

						</div>
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
									placeholder="Enter  Title for Task"
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

							{/* <label htmlFor="checklist"
								className='et-checklist'
							>
								<h4>
									Checklist
								</h4>
								{task.Checklist.length > 0 && task?.Checklist ?
									// BROKEN CHECKLIST CANNOT USE DUE TO Q OF CTRL INPUT
									<Checklist taskId={taskId} checklist={checklist} setChecklist={setChecklist} />
									:
									<>
										Create a checklist!
									</>
								}
							</label> */}
							<button className='et-submit submit'>Save</button>
						</form>
						<div>

						</div>
					</div>
				</>
			</div>
		</>
	)
}

export default EditTask;
