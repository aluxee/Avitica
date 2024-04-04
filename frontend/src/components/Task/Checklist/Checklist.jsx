import { useDispatch, useSelector } from "react-redux";
import { thunkEditChecklist, thunkLoadChecklist } from "../../../store/checklist";
import { useEffect, useState } from "react";
import './Checklist.css'


function Checklist({ taskId, checklist, setChecklist }) {

	console.log("%c 🚀 ~ file: Checklist.jsx:9 ~ Checklist ~ checklist: ", "color: red; font-size: 25px", checklist)

	const initialCheck = checklist.reduce((obj, item) => {

		console.log("%c 🚀 ~ file: Checklist.jsx:13 ~ initialCheck ~ item: ", "color: green; font-size: 25px", item)


		console.log("%c 🚀 ~ file: Checklist.jsx:13 ~ initialCheck ~ obj: ", "color: green; font-size: 25px", obj)
		if (obj) {
			obj[item.id] = item.checked, {}
		}

	})



	const [checkItem, setCheckItem] = useState(initialCheck || {});



	const dispatch = useDispatch();
	const checklistObj = useSelector(state => {
		const task = state.task[taskId]
		if (task) {
			return task.Checklist
		}
	})

	const theList = Object.values(checklistObj);

	useEffect(() => {
		dispatch(thunkLoadChecklist(checklist))

	}, [dispatch, checklist])

	const handleCheckboxChanges = async (id) => {
		// Update the local checklist state
		const previousCheck = checkItem[id];
		setCheckItem({ ...checkItem, [id]: !previousCheck })
		const updatedChecklist = checklist.map(item => {
			if (item.id === id) {
				return { ...item, checked: !previousCheck };
			}
			return item;
		});

		// Update the global state using setChecklist
		setChecklist(updatedChecklist);

		// Dispatch the thunk to update the checklist item in the database
		await dispatch(thunkEditChecklist(taskId, id, !previousCheck));
	};

	if (!checkItem) {
		return <h1>Loading</h1>
	}
	return (
		<>
			<div className="cl-outer">
				<div className="cl-inner">
					<div className="theList-form-not-form">

						{theList.length && theList.map(item => (

							<div key={item.id} className="checklist-ind">
								<input
									type="checkbox"
									value={item.id}
									checked={checkItem[item.id]}
									onChange={(e) => handleCheckboxChanges(e.target.value)}
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
