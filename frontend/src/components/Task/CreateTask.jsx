import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";




import './CreateTask.css';


function CreateTask({ allTasks }) {

	console.log("%c 🚀 ~ file: CreateTask.jsx:10 ~ CreateTask ~ allTasks: ", "color: orange; font-size: 25px", allTasks)
	const { taskId } = useParams();

	console.log("%c 🚀 ~ file: CreateTask.jsx:16 ~ CreateTask ~ taskId: ", "color: orange; font-size: 25px", taskId)

	const task = allTasks.find(task => {
		return task.id == taskId
	})
	console.log("%c 🚀 ~ file: CreateTask.jsx:17 ~ CreateTask ~ task: ", "color: orange; font-size: 25px", task)


	const handleSubmit = async (e) => {
		e.preventDefault();

		const newEdits = {
			title
		};

		// const res = await dispatch(thunkEditList(list.id, newEdits));

		// if (res && res.errors) {
		// 	return setErrors(res.errors);
		// }
		// setEditing(false);
		// dispatch(thunkGetAllLists());
	};

	// const hoverClassName = "hover" + (hoverCaption !== null ? "" : "hidden");


	return (
		<>
			<form action="">

			</form>
		</>
	)
}


export default CreateTask;
