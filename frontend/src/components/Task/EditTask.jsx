import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { thunkEditTask } from '../../store/task';




function EditTask({ task, taskId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal(); const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [difficulty, setDifficulty] = useState(task.difficulty);
	const [dueDate, setDueDate] = useState(task.dueDate);
	const [checklist, setChecklist] = useState(task.Checklist);
	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();

		const editUserTask = {
			title,
			description,
			checklist,
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
								Title
								<input
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Enter a title"
								/>
								{errors?.title && <p className="p-error">{errors.title} </p>}
							</label>
							<label htmlFor="difficulty">
								Difficulty
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
							<label htmlFor="description">
								Description
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
							<label htmlFor="dueDate">
								Due Date
								<input
									value={dueDate}
									type="date"
									onChange={(e) => setDueDate(e.target.value)}
								/>
								{errors?.dueDate && (
									<p className="p-error">{errors.dueDate} </p>
								)}
							</label>
							<label htmlFor="checklist">
								Check List
								<input
									value={checklist}
									onChange={(e) => setChecklist(e.target.value)}
								/>
							</label>
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
