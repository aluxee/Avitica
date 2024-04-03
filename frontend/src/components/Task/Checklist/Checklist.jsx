import { useDispatch, useSelector } from "react-redux";
import { thunkEditChecklist, thunkLoadChecklist } from "../../../store/task";
import { useEffect } from "react";
import './Checklist.css'


function Checklist({ taskId, checklist, setChecklist }) {
	const dispatch = useDispatch();
	const checklistObj = useSelector(state => state.task)

	const theList = Object.values(checklistObj);

	useEffect(() => {
		dispatch(thunkLoadChecklist(taskId))

	}, [dispatch, taskId])

	const handleCheckboxChanges = async (checklistId, checked) => {
		// Update the local checklist state
		const updatedChecklist = checklist.map(item => {
			if (item.id === checklistId) {
				return { ...item, checked: checked };
			}
			return item;
		});

		// Update the global state using setChecklist
		setChecklist(updatedChecklist);

		// Dispatch the thunk to update the checklist item in the database
		await dispatch(thunkEditChecklist(taskId, checklistId, checked));
	};


	return (
		<>
			<div className="cl-outer">
				<div className="cl-inner">
					<div className="theList-form-not-form">

						{theList.map(item => (

							<div key={item.id} className="checklist-ind">
								<input
									type="checkbox"
									id={item.id}
									name={item.checklistItem}
									checked={item.checked}
									onChange={(e) => handleCheckboxChanges(item.id, e.target.checked)}
								/>
								<label
									htmlFor={item.id}>
									{item.checklistItem}
								</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}



export default Checklist;
