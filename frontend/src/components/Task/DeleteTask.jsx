import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./DeleteTask.css";
import { thunkLoadTasks, thunkRemoveTask } from "../../store/task";
import { useModal } from "../../context/Modal";
function DeleteTask({ taskId }) {
	const dispatch = useDispatch();

	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await dispatch(thunkRemoveTask(taskId));
		if (res && res.errors) {
			return res.errors;
		}
		await dispatch(thunkLoadTasks())
		// navigate('/')
		closeModal()
		// return res;

	}


	// useEffect(() => {
	// }, [dispatch])

	return (
		<>
			<div className="delete-spot_container">

				<h1> Confirm Delete</h1>
				<h3>Are you sure you want to remove this task
					from the listings?</h3>
				<form onSubmit={handleSubmit}>

					<button className="delete-task-button" id="delete-task-no" onClick={closeModal()}> No (Keep task)</button>

					<button type="submit"
						// onClick={closeModal}
						className="delete-task-button" id="delete-task-yes">Yes (Delete task)
					</button>
				</form>
			</div>

		</>
	);
}

export default DeleteTask;
