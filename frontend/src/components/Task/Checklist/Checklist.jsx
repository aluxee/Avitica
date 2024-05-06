import { useDispatch, useSelector } from "react-redux";
import { thunkEditChecklist, thunkLoadChecklist, thunkRemoveChecklist } from "../../../store/checklist";
import { useEffect, useState, useRef } from "react";
import './Checklist.css'


function Checklist({ taskId, checklist, setChecklist }) {
	const dispatch = useDispatch();
	// console.log("%c 🚀 ~ file: Checklist.jsx:9 ~ Checklist ~ taskId: ", "color: red; font-size: 25px", taskId)
	useEffect(() => {
		// dispatch(thunkLoadChecklist(taskId))
		// if (checklist.length > 0) {
		// 	setChecklist(checklist)
		// }
	}, [checklist, taskId])

	// console.log("%c 🚀 ~ file: Checklist.jsx:9 ~ Checklist ~ checklist: ", "color: red; font-size: 25px", checklist)

	const initialCheck = Object.values(checklist).reduce((obj, item) => {
		if (obj) {
			obj[item.id] = item.checked, {}
			// console.log("%c 🚀 ~ file: obj.jsx:19 ~ initialCheck ~ obj: ", "color: pink; font-size: 25px", obj)
		}
		const { id, checked } = item
		// console.log("%c 🚀 ~ file: Checklist.jsx:49 ~ initialCheck ~ id: ", "color: red; font-size: 25px", id)
		// console.log("%c 🚀 ~ file: Checklist.jsx:49 ~ initialCheck ~ checked: ", "color: red; font-size: 25px", checked)
		// console.log("%c 🚀 ~ file: Checklist.jsx:49 ~ initialCheck ~ item: ", "color: red; font-size: 25px", item)
		return { ...obj, [id]: checked }

	}, {})

	const [checkItem, setCheckItem] = useState(initialCheck || {});
	const [liveCheck, setLiveCheck] = useState(null);
	const checkRef = useRef(liveCheck);
	const list = useSelector(state => state.checklist)
	const checklistAllArr = Object.values(list)

	// console.log("%c 🚀 ~ file: Checklist.jsx:38 ~ Checklist ~ checklistAllArr: ", "color: red; font-size: 25px", checklistAllArr)

	const theChecklist = checklistAllArr.filter(item => item.taskId === taskId)

	console.log("%c 🚀 ~ file: Checklist.jsx:44 ~ Checklist ~ theChecklist: ", "color: red; font-size: 25px", theChecklist)

	const handleCheckboxChanges = async (id) => {

		if (id) {
			// Update the local checklist state
			const previousCheck = checkItem[id];

			// console.log("%c 🚀 ~ file: Checklist.jsx:61 ~ handleCheckboxChanges ~ previousCheck: ", "color: orange; font-size: 25px", previousCheck)

			setCheckItem({ ...checkItem, [id]: !previousCheck }) // took off bang in front of previousCheck
			const updatedChecklist = theChecklist?.map(item => {


				if (item.id === id) {
					return { ...item, checked: !previousCheck };
				}
				return item;
			});
			// console.log("%c 🚀 ~ file: Checklist.jsx:72 ~ updatedChecklist ~ updatedChecklist: ", "color: pink; font-size: 25px", updatedChecklist)


			// Update the global state using setChecklist
			setChecklist(updatedChecklist);
			// Dispatch the thunk to update the checklist item in the database
			const selectedItem = updatedChecklist.find(item => item.id === id);


			// console.log("%c 🚀 ~ file: Checklist.jsx:76 ~ handleCheckboxChanges ~ previousCheck: ", "color: lilac; font-size: 30px", previousCheck)


			// console.log("%c 🚀 ~ file: Checklist.jsx:73 ~ handleCheckboxChanges ~ selectedItem: ", "color: chocolate; font-size: 30px", "code 20182", selectedItem, selectedItem.checked, checklist)
			setLiveCheck(selectedItem.checked)

			checkRef.current = selectedItem.checked;

			// console.log("%c 🚀 ~ file: Checklist.jsx:91 ~ handleCheckboxChanges ~ checkRef: ", "color: yellow; font-size: 25px", checkRef)

			await dispatch(thunkEditChecklist(taskId, id, !previousCheck));
			// setSelectTrue(true)
			// console.log("%c 🚀 ~ file: Checklist.jsx:73 ~ handleCheckboxChanges ~ selectedItem: ", "color: chocolate; font-size: 30px", "code 20183", selectedItem, liveCheck); // UNRELIABLE
			clearSelectedChecklistItems(id)
			// setSelectTrue(false)
		}
	};


	// console.log("%c 🚀 ~ file: Checklist.jsx:88 ~ Checklist ~ checklist: ", "color: pink; font-size: 30px", checklist)



	const clearSelectedChecklistItems = async (id) => {
		console.log("code 2010", theChecklist, checklist)


		// console.log("%c 🚀 ~ file: Checklist.jsx:82 ~ clearSelectedChecklistItems ~ previousCheck: ", "color: red; font-size: 25px", initialCheck)

		// console.log("%c 🚀 ~ file: Checklist.jsx:82 ~ clearSelectedChecklistItems ~ previousCheck: ", "color: red; font-size: 25px", initialCheck)
		const selectedItem = theChecklist.find(item => item.id === id)
		const filteredChecklist = theChecklist.filter(item => item.id !== id)
		if (selectedItem) {
			if (checkRef.current === true) {
				await dispatch(thunkRemoveChecklist(taskId, selectedItem.id))
			}
			return filteredChecklist
		}


		// console.log("%c 🚀 ~ file: Checklist.jsx:88 ~ clearSelectedChecklistItems ~ filteredChecklist: ", "color: red; font-size: 25px", filteredChecklist)

		setChecklist(filteredChecklist)
		await dispatch(thunkLoadChecklist(taskId))




	}

	useEffect(() => {
		// handleCheckboxChanges()
	}, [taskId, checklist.id])

	if (!checkItem) {
		return <h1>Loading...</h1>
	}
	return (
		<>
			<div className="cl-outer">
				<div className="cl-inner">
					<div className="theList-form-not-form">
						{theChecklist.length > 0 && theChecklist?.map(item => (

							(<div key={item.id} className="checklist-ind">
								<input
									type="checkbox"
									value={item.id}
									checked={checkItem[item.id]}
									onChange={() => {
										console.log("code 10281", item.id)
										handleCheckboxChanges(item.id)
									}
									}
								/>
								<label
									htmlFor={item.id}>
									{item.checklistItem}
								</label>
							</div>)
						))
						}
					</div>
				</div>
			</div>
		</>
	)
}



export default Checklist;
