import { useDispatch, useSelector } from "react-redux";
import { thunkEditChecklist, thunkLoadChecklist } from "../../../store/checklist";
import { useEffect, useState } from "react";
import './Checklist.css'


function Checklist({ taskId, checklist, setChecklist }) {

	console.log("%c 🚀 ~ file: Checklist.jsx:9 ~ Checklist ~ taskId: ", "color: red; font-size: 25px", taskId)


	console.log("%c 🚀 ~ file: Checklist.jsx:9 ~ Checklist ~ checklist: ", "color: red; font-size: 25px", checklist)

	const initialCheck = checklist.reduce((obj, item) => {

		console.log("%c 🚀 ~ file: Checklist.jsx:13 ~ initialCheck ~ item: ", "color: green; font-size: 25px", item)


		console.log("%c 🚀 ~ file: Checklist.jsx:19 ~ initialCheck ~ obj: ", "color: green; font-size: 25px", obj)
		if (obj) {
			obj[item.id] = item.checked, {}
			console.log("%c 🚀 ~ file: obj.jsx:19 ~ initialCheck ~ obj: ", "color: pink; font-size: 25px", obj)

		}

	}, {})



	const [checkItem, setCheckItem] = useState(initialCheck || {});



	const dispatch = useDispatch();
	//created empty Checklist for initial state of task to start with thus changing bottom variable from checklistObj to theChecklist
	const theTasks = useSelector(state => state.task)

	console.log("%c 🚀 ~ file: Checklist.jsx:38 ~ Checklist ~ theTasks: ", "color: orange; font-size: 25px", theTasks)

	const theChecklist = useSelector(state => {
		console.log("%c 🚀 ~ file: Checklist.jsx:31 ~ STATE ~ STATE: ", "color: aliceblue; font-size: 25px", state)
		const checklist = state.checklist

		console.log("%c 🚀 ~ file: Checklist.jsx:40 ~ theChecklist ~ checklist: ", "color: red; font-size: 25px", checklist)

		const task = state.task[taskId]
		if (task) {

			console.log("%c 🚀 ~ file: Checklist.jsx:37 ~ theChecklist ~ task (inside conditional): ", "color: aliceblue; font-size: 25px", task, task.Checklist)
			task.Checklist = checklist
			return task.Checklist
		}
	})
	console.log("%c 🚀 ~ file: Checklist.jsx:42 ~ theChecklist ~ theChecklist: ", "color: cornflowerblue; font-size: 30px", theChecklist)

	// const theList = checklistObj ? Object.values(checklistObj) : [];
	const checkListArr = Object.values(theChecklist)
	useEffect(() => {
		dispatch(thunkLoadChecklist(taskId))

	}, [dispatch, checklist, taskId])

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

						{checkListArr.length > 0 && checkListArr.map(item => (

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
