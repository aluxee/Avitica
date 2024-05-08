import { useDispatch, useSelector } from "react-redux";
import { thunkEditCheckedChecklist, thunkEditChecklistItem, thunkLoadChecklist, thunkCreateChecklist, thunkRemoveChecklist } from "../../../store/checklist";
import { useEffect, useState, useRef } from "react";
import './Checklist.css'


function Checklist({ task, taskId, checklist, setChecklist, editChecklistItem, setEditChecklistItem, addChecklistItem, setAddChecklistItem }) {

	const dispatch = useDispatch();
	const initialCheck = Object.values(checklist).reduce((obj, item) => {
		if (item.id) {

			if (obj) {
				console.log("%c 🚀 ~ file: obj.jsx:19 ~ initialCheck ~ obj: ", "color: pink; font-size: 25px", obj)
				obj[item.id] = item.checked, {}
			}
			const { id, checked } = item
			return { ...obj, [id]: checked }
		}

	}, {})

	const [errors, setErrors] = useState({});
	const [checkItem, setCheckItem] = useState(initialCheck || {});
	const [liveCheck, setLiveCheck] = useState(null);
	const checkRef = useRef(liveCheck);
	const list = useSelector(state => state.checklist);
	const checklistAllArr = Object.values(list);
	const [checklistState, setChecklistState] = useState(task.Checklist); // array
	const theChecklist = checklistAllArr.filter(item => item.taskId === taskId)
	const [currItem, setCurrItem] = useState('');
	const [checklistItem, setChecklistItem] = useState(''); // individual items

	console.log("%c 🚀 ~ file: Checklist.jsx:44 ~ Checklist ~ theChecklist: ", "color: red; font-size: 25px", theChecklist)

	// useEffect(() => {
	// 	const errorsObject = {};
	// 	checklist.length >= 5 ? errorsObject.checklist = 'You`ve reached your maximum amount of checklist items' : checklist.checklistItem
	// 	checklist.length === 0 ? errorsObject.checklist = 'Title for the item is required' : checklist.checklistItem

	// 	setErrors(errorsObject);

	// }, [checklist])

	const prevList = list

	console.log("%c 🚀 ~ file: Checklist.jsx:47 ~ Checklist ~ list: ", "color: red; font-size: 25px", list)
	useEffect(() => {
		if (prevList) {
			setChecklistItem(prevList.checklistItem)
		}
	}, [prevList]);

	useEffect(() => {
		if (theChecklist.length === 0) {
			setChecklist(theChecklist)

		}
		if (checklist && checklist.id && checklist.length > 0) { // need the length to ensure a checkbox does not appear
			const updatedChecklist = checklist.filter(item => !checkItem[item.id])

			console.log("%c 🚀 ~ file: Checklist.jsx:57 ~ useEffect ~ updatedChecklist: ", "color: red; font-size: 25px", updatedChecklist)
			setChecklist(updatedChecklist)
		}
	}, [currItem, checkItem]) // recent change: removed taskId


	const handleCheckboxChanges = async (id) => {

		if (id) {
			// Update the local checklist state
			const previousCheck = checkItem[id];
			setCurrItem(checkItem)
			// console.log("%c 🚀 ~ file: Checklist.jsx:61 ~ handleCheckboxChanges ~ previousCheck: ", "color: orange; font-size: 25px", previousCheck)

			setCheckItem({ ...checkItem, [id]: !previousCheck });
			const updatedChecklist = theChecklist?.map(item => {
				if (item.id === id) {
					return { ...item, checked: !previousCheck };
				}
				setCurrItem(item)
				return item;
			});
			// console.log("%c 🚀 ~ file: Checklist.jsx:72 ~ updatedChecklist ~ updatedChecklist: ", "color: pink; font-size: 25px", updatedChecklist)


			// Update the global state using setChecklist passed from task
			setChecklist(updatedChecklist);


			const selectedItem = updatedChecklist.find(item => item.id === id);

			console.log("%c 🚀 ~ file: Checklist.jsx:74 ~ handleCheckboxChanges ~ selectedItem: ", "color: yellow; font-size: 25px", selectedItem)

			setLiveCheck(selectedItem.checked)
			checkRef.current = selectedItem.checked;
			setCurrItem(selectedItem)
			// Dispatch the thunk to update the checklist item in the database, keep in mind previousCheck will display a toggle of it's previous status
			await dispatch(thunkEditCheckedChecklist(taskId, id, !previousCheck));
			// checklistItem.checked = checkRef.current


			//invoke the function to remove the checked checklist item
			clearSelectedChecklistItems(id)
		}

		console.log("%c 🚀 ~ file: Checklist.jsx:85 ~ handleCheckboxChanges ~ currItem: ", "color: lightblue; font-size: 25px", currItem)

	};

	const handleDoubleClickAdd = async () => {
		if (checklist.length < 5) {
			setAddChecklistItem(true); // show the input field for adding
		} else if (checklist.length === 0) {
			setAddChecklistItem(false)
		} else {
			alert('You cannot add any more items to this checklist')
		}
	}

	const handleAddAndSubmit = async (e) => {
		e.preventDefault();
		if (checklist.length >= 5) {
			setErrors({ checklist: 'You cannot add any more items to this checklist' }
			)
			alert('You cannot add any more items to this checklist')
			setChecklistItem('');
			setAddChecklistItem(false);

		} else {
			handleAddChecklistItem(e)
		}
		return;
	}

	const handleAddChecklistItem = async (e) => {
		e.preventDefault();
		// setAddChecklistItem(true)
		//* if the checklist item has no content inside the input, do not proceed with adding the item to the checklist
		// adding a new checklist item
		// if (!checklistItem.trim()) { // removes white space from string
		// 	setErrors({ checklistItem: "Checklist item cannot be empty" })
		// }

		const newToDoItem = { checklistItem };

		console.log("%c 🚀 ~ file: Checklist.jsx:138 ~ handleAddChecklistItem ~ checklistItem: ", "color: magenta; font-size: 25px", checklistItem)
		if (addChecklistItem === true) {

			const submissionResults = await dispatch(thunkCreateChecklist(taskId, newToDoItem))

			console.log("%c 🚀 ~ file: Checklist.jsx:143 ~ handleAddChecklistItem ~ submissionResults: ", "color: magenta; font-size: 25px", submissionResults)

			// return submissionResults.errors
			if (!submissionResults?.errors) {
				// if no errors, update the UI immediately with the new checklist item as a new addition to the checklist (ensure to update what was passed down and whats present)
				// setChecklistItem(''); // clear input field after successful addition
				setAddChecklistItem(false);
				setChecklist([...checklist, submissionResults.checklistItem]);
				setChecklistState([...checklist, submissionResults.checklistItem]);
				console.log("%c 🚀 ~ file: Checklist.jsx:177 ~ handleAddChecklistItem ~ submissionResults: ", "color: red; font-size: 25px", submissionResults, submissionResults.id)

				// after edit, revert the checklist add item state back to false

				console.log("%c 🚀 ~ file: Checklist.jsx:137 ~ handleAddChecklistItem ~ checklistState: ", "color: skyblue; font-size: 25px", checklistState, "VERSUS", theChecklist, checklistItem); // if this does NOT match the checklist, also update the checklist
				setCurrItem(submissionResults.checklistItem)
			} else {
				return submissionResults.errors
			}

			// contingency checklist load
			await dispatch(thunkLoadChecklist(taskId));
		}

	};

	const clearSelectedChecklistItems = async (id) => {
		console.log("code 2010", theChecklist, checklist, "checklist State: ", checklistState, "selectedITEM: ", currItem)
		const selectedItem = checklist.find(item => item.id === id)

		console.log("%c 🚀 ~ file: Checklist.jsx:96 ~ clearSelectedChecklistItems ~ selectedItem: ", "color: red; font-size: 25px", selectedItem, checkRef.current)

		if (checkRef.current === true) {
			selectedItem.checked = true
			setCurrItem(selectedItem)
		}

		console.log("%c 🚀 ~ file: Checklist.jsx:103 ~ clearSelectedChecklistItems ~ selectedItem: ", "color: blue; font-size: 25px", selectedItem)

		const filteredChecklist = checklist.filter(item => item.id !== id);

		if (selectedItem) {
			if (checkRef.current === true) {
				await dispatch(thunkRemoveChecklist(taskId, selectedItem.id))
				await dispatch(thunkLoadChecklist(taskId))
			}
			setCurrItem('')
			return filteredChecklist
		}

		setChecklist(filteredChecklist)
		setChecklistState(filteredChecklist)
		console.log("%c 🚀 ~ file: Checklist.jsx:118 ~ clearSelectedChecklistItems ~ filteredChecklist: ", "color: red; font-size: 25px", filteredChecklist, checklist)
		// theChecklist = filteredChecklist

	};

	const handleEditItemSubmit = async (e, id) => {
		e.preventDefault();

		const editChecklistItem = {
			checklistItem
		}


		// const submissionResults = await dispatch(thunkEditTask(editUserTask, taskId));
		const submissionResults = await dispatch(thunkEditChecklistItem(taskId, id, editChecklistItem))

		if (submissionResults.errors) {
			setErrors(submissionResults.errors)
			return setErrors(submissionResults.errors)
		} else {
			//reset edit state
			setEditChecklistItem(false)
		}
	}


	if (!checkItem) {
		return <h1>Loading...</h1>
	}
	return (
		<>
			<div className="cl-outer">
				<div className="cl-inner">
					<div className="checklist" onDoubleClick={handleDoubleClickAdd}>
						<h4>Checklist</h4>

						{checklist?.length > 0 ? checklist?.map((item, index) => (
							<div className="checklist-items" key={index}>
								<div className="checklist-ind">
									<label htmlFor={item.id}>
										<input
											type="checkbox"
											value={item.id}
											checked={checkItem[item.id]}
											onChange={() => handleCheckboxChanges(item.id)}
										/>
										{item.checklistItem}
									</label>
								</div>

								<div className="edit-checklist">
									{/* Add your edit checklist item UI here */}
								</div>
							</div>
						))
							: <>
								{addChecklistItem === false &&
									<div
										onDoubleClick={handleAddAndSubmit}
									>Create a Checklist!</div>
								}
							</>
						}
						{editChecklistItem === false && addChecklistItem === true && (
							<div className="add-checklist">
								<form onSubmit={handleAddAndSubmit}>
									<label htmlFor="checklistItem">
										<input
											value={checklistItem}
											type='text'
											name="checklistItem"
											onChange={(e) => setChecklistItem(e.target.value)}
											placeholder="Enter Checklist Item"
										/>
										<p className="p-error">{errors?.checklist}</p>
									</label>
									<button type="submit"
									>Add Item</button>
								</form>
							</div>
						)}
					</div>
					{
						checklist.length > 0 &&
						<div className="add-icon">
							<i
								onClick={handleDoubleClickAdd}
								className="fa-solid fa-plus" />
							{/* if there's more than 5 checklist send an error*/}
						</div>
					}
				</div>
			</div>
		</>
	)
}



export default Checklist;
