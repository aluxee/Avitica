import { useDispatch } from "react-redux";
import { thunkCreateChecklist, thunkLoadChecklist } from "../../../store/checklist";
import { useState } from "react";
// import { useModal } from '../../context/Modal';
// const { closeModal } = useModal();





function CreateChecklist({taskId}) {
	const dispatch = useDispatch();
	const [checklistItem, setChecklistItem] = useState('');



	const handleSubmit = async (e) => {
		e.preventDefault();

		const newToDoItem = {
			checklistItem
		}

		const submissionResults = await dispatch(thunkCreateChecklist(taskId, newToDoItem));

		if (submissionResults.errors) {
			return submissionResults.errors
		}

		await dispatch(thunkLoadChecklist())
	}

	return (
		<>
			<div className="checklist-container">
				<form action="" onSubmit={handleSubmit}>
					<label className="checklist-label" htmlFor="item">
						<h4>
							Add Todo Item
						</h4>
						<input
							className="pt-task-input"
							type="text"
							value={checklistItem}
							onChange={(e) => setChecklistItem(e.target.value)}
							placeholder="Enter Mini-ToDo"
						/>
						{/* <p className="p-error">{errors?.checklistItem}</p> */}
					</label>
					<button type="submit" className="pt-checklist-submit"
						// disabled={Object.values(errors).length > 0}
					>
						Save
					</button>
				</form>
			</div>
		</>
	)

}



export default CreateChecklist;
