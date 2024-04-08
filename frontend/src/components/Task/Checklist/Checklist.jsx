import { useDispatch, useSelector } from "react-redux";
import { thunkEditChecklist, thunkLoadChecklist } from "../../../store/checklist";
import { useEffect, useState } from "react";
import './Checklist.css'


function Checklist({ taskId, checklist, setChecklist }) {

	// console.log("%c 🚀 ~ file: Checklist.jsx:9 ~ Checklist ~ taskId: ", "color: red; font-size: 25px", taskId)


	// console.log("%c 🚀 ~ file: Checklist.jsx:9 ~ Checklist ~ checklist: ", "color: red; font-size: 25px", checklist)

	const initialCheck = Object.values(checklist).reduce((obj, item) => {
		// if (obj) {
		// 	obj[item.id] = item.checked, {}
		// 	console.log("%c 🚀 ~ file: obj.jsx:19 ~ initialCheck ~ obj: ", "color: pink; font-size: 25px", obj)
		// }
		const { id, checked } = item
		// console.log("%c 🚀 ~ file: Checklist.jsx:49 ~ initialCheck ~ id: ", "color: red; font-size: 25px", id)
		// console.log("%c 🚀 ~ file: Checklist.jsx:49 ~ initialCheck ~ checked: ", "color: red; font-size: 25px", checked)
		// console.log("%c 🚀 ~ file: Checklist.jsx:49 ~ initialCheck ~ item: ", "color: red; font-size: 25px", item)


		return { ...obj, [id]: checked }

	}, {})

	// console.log("%c 🚀 ~ file: Checklist.jsx:24 ~ initialCheck ~ initialCheck: ", "color: green; font-size: 25px", initialCheck)


	//TODO: handle completion of tasks and point/ exp grants first in advancedTasks -- esp get the point system going
	//TODO: remove height: 100% on body for render so that background can show up properly;
	//TODO: make sure to change font colors for the 2nd nav -- if gold is NaN, make sure it displays as 0
	//TODO: create enough space at bottom of the shop container
	//* focus solely on tasks, checklist are bonus, just make sure when it is checked they disappear after user clicks out
	const [checkItem, setCheckItem] = useState(initialCheck || {});



	const dispatch = useDispatch();
	//created empty Checklist for initial state of task to start with thus changing bottom variable from checklistObj to theChecklist
	// const theTasks = useSelector(state => state.task)

	// console.log("%c 🚀 ~ file: Checklist.jsx:45 ~ Checklist ~ theTasks: ", "color: orange; font-size: 25px", theTasks)

	// const theChecklist = useSelector(state => {


	// 	console.log("%c 🚀 ~ file: Checklist.jsx:31 ~ STATE ~ STATE: ", "color: aliceblue; font-size: 25px", state)
	// 	const checklist = state.checklist

	// 	console.log("%c 🚀 ~ file: Checklist.jsx:40 ~ theChecklist ~ checklist: ", "color: red; font-size: 25px", checklist)

	// 	const task = state.task[taskId]
	// 	if (task) {

	// 		console.log("%c 🚀 ~ file: Checklist.jsx:37 ~ theChecklist ~ task (inside conditional): ", "color: aliceblue; font-size: 25px", task, task.Checklist)
	// 		task.Checklist = checklist
	// 		return task.Checklist
	// 	}
	// })
	// console.log("%c 🚀 ~ file: Checklist.jsx:42 ~ theChecklist ~ theChecklist: ", "color: cornflowerblue; font-size: 30px", theChecklist)

	const list = useSelector(state => state.checklist)
	const checklistAllArr = Object.values(list)


	// console.log("%c 🚀 ~ file: Checklist.jsx:67 ~ Checklist ~ list: ", "color: cornflowerblue; font-size: 25px", list)
	// console.log("%c 🚀 ~ file: Checklist.jsx:68 ~ Checklist ~ checklistAllArr: ", "color: red; font-size: 25px", checklistAllArr)
	const theChecklist = checklistAllArr.filter(item => item.taskId === taskId)

	// console.log("%c 🚀 ~ file: Checklist.jsx:73 ~ Checklist ~ theChecklist: ", "color: red; font-size: 25px", theChecklist)




	// const theList = checklistObj ? Object.values(checklistObj) : [];
	const checkListArr = Object.values(theChecklist)
	useEffect(() => {
		dispatch(thunkLoadChecklist(taskId))

	}, [dispatch, checklist, taskId])

	const handleCheckboxChanges = async (id) => {
		// Update the local checklist state
		const previousCheck = checkItem[id];
		setCheckItem({ ...checkItem, [id]: !previousCheck })
		const updatedChecklist = checkListArr?.map(item => {
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

						{checkListArr.length > 0 && checkListArr?.map(item => (

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
