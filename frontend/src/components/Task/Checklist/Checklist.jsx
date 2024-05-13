import { useDispatch, useSelector } from "react-redux";
import { thunkEditCheckedChecklist, thunkEditChecklistItem, thunkLoadChecklist, thunkCreateChecklist, thunkRemoveChecklist } from "../../../store/checklist";
import { useEffect, useState, useRef } from "react";
import './Checklist.css'


function Checklist({ task, taskId, checklist, setChecklist, editChecklistItem, setEditChecklistItem, addChecklistItem, setAddChecklistItem, toggleMenu }) {


	const dispatch = useDispatch();
	const initialCheck = Object.values(checklist).reduce((obj, item) => {
		if (item.id) {

			if (obj) {
				// console.log("%c 🚀 ~ file: obj.jsx:19 ~ initialCheck ~ obj: ", "color: pink; font-size: 25px", obj)
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
	const theChecklist = checklistAllArr.filter(item => item.taskId === taskId)
	const [currItem, setCurrItem] = useState('');
	const [checklistItem, setChecklistItem] = useState(''); // individual items
	const [hover, setHover] = useState('');
	const [showCaption, setShowCaption] = useState(false);
	const [currEditItem, setCurrEditItem] = useState(null);

	// for caption
	const onHover = () => {
		setHover('checklist');
	}
	const offHover = () => {
		setHover('');
	}

	const hoverClassName = 'caption ' + (hover === 'checklist' ? '' : 'hidden');


	//* useEffect
	useEffect(() => {
		const errorsObject = {};

		checklistItem?.length < 3 ? errorsObject.checklist = 'Title must be greater than 3 characters' : checklistItem;
		checklistItem?.length < 3 ? errorsObject.checklistItem = 'Title must be greater than 3 characters' : checklistItem;

		checklistItem?.length >= 50 ? errorsObject.checklist = 'Title must be less than 50 characters' : checklistItem;
		checklistItem?.length >= 50 ? errorsObject.checklistItem = 'Title must be less than 50 characters' : checklistItem;

		setErrors(errorsObject);
	}, [checklistItem])

	const prevList = list;

	useEffect(() => {
		if (prevList) {
			setChecklistItem(prevList?.checklistItem || '')
		}
	}, [prevList, setShowCaption]);


	useEffect(() => {

		if (checklist && checklist.id && checklist.length > 0) { // need the length to ensure a checkbox does not appear
			const updatedChecklist = checklist.filter(item => !checkItem[item.id])

			setChecklist(updatedChecklist)
		}
	}, [currItem, checkItem, checklist])

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

			// console.log("%c 🚀 ~ file: Checklist.jsx:74 ~ handleCheckboxChanges ~ selectedItem: ", "color: yellow; font-size: 25px", selectedItem)

			setLiveCheck(selectedItem.checked)
			checkRef.current = selectedItem.checked;
			setCurrItem(selectedItem)
			// Dispatch the thunk to update the checklist item in the database, keep in mind previousCheck will display a toggle of it's previous status
			await dispatch(thunkEditCheckedChecklist(taskId, id, !previousCheck));
			// checklistItem.checked = checkRef.current


			//invoke the function to remove the checked checklist item
			clearSelectedChecklistItems(id)
		}

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

		const newToDoItem = { checklistItem };

		checklist.forEach(item => {
			console.log(item)
			if (item.checklistItem === checklistItem) {
				setErrors({ checklistItem: 'You cannot have duplicate items' })
			}
		})

		if (addChecklistItem === true) {

			const submissionResults = await dispatch(thunkCreateChecklist(taskId, newToDoItem))

			// return submissionResults.errors
			if (!submissionResults?.errors) {
				// if no errors, update the UI immediately with the new checklist item as a new addition to the checklist (ensure to update what was passed down and whats present)
				setAddChecklistItem(false);
				setChecklist([...checklist, submissionResults.checklistItem]);

				setCurrItem(submissionResults.checklistItem)
			} else {
				return submissionResults.errors
			}

			// contingency checklist load
			await dispatch(thunkLoadChecklist(taskId));
			setEditChecklistItem(false);
		}
	};

	const clearSelectedChecklistItems = async (id) => {

		const selectedItem = checklist.find(item => item.id === id)
		if (checkRef.current === true) {
			selectedItem.checked = true
			setCurrItem(selectedItem)
		}

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
		task.Checklist = filteredChecklist
	};

	const handleEditItemSubmit = async (e, id) => {
		e.preventDefault();
		setAddChecklistItem(false);
		setEditChecklistItem(true);

		const editChecklistItem = {
			checklistItem
		}

		checklist.forEach(item => {
			console.log(item)
			if (item.checklistItem === checklistItem) {
				setErrors({ checklistItem: 'You cannot have duplicate items' })
			}
		})



		// const submissionResults = await dispatch(thunkEditTask(editUserTask, taskId));
		const submissionResults = await dispatch(thunkEditChecklistItem(taskId, id, editChecklistItem.checklistItem))

		if (submissionResults.errors) {
			setErrors(submissionResults.errors)
			return setErrors(submissionResults.errors)
		}
		else {
			// 	//reset edit state
			setEditChecklistItem(false)
		}
		await dispatch(thunkLoadChecklist(taskId))
	}


	if (!checkItem) {
		return <h1>Loading...</h1>
	}

	return (
		<>
			<div className="cl-outer">
				<div className="cl-inner">
					<div className="checklist">
						<h4
							onDoubleClick={handleDoubleClickAdd}
							onClick={() => {
								setAddChecklistItem(false);
								toggleMenu();
							}}
							onMouseOver={onHover}
							onMouseOut={offHover}
						>
							Checklist
							{hover === 'checklist' && (
								<p className={hoverClassName + (showCaption ? '' : ' hidden')}>
									Double click &#34;Checklist&#34; to add item <br />
									Single click to cancel out adding item
								</p>
							)}
						</h4>

						{checklist?.length > 0 && checklist.map((item, index) => (
							<div className="checklist-items" key={index}>
								<div className="checklist-ind">
									<form onSubmit={handleEditItemSubmit}>

										<label className={'item-label'} htmlFor={item.id}>
											<input
												type="checkbox"
												value={item.id}
												checked={checkItem[item.id]}
												onChange={() => handleCheckboxChanges(item.id)}
												disabled={currEditItem === item.id}
											/>
											{/* Display editable input field only when editing is enabled */}
											{currEditItem === item.id && editChecklistItem ? (
												<label className="edit-on">
													<input
														className="edit-input"
														type="text"
														placeholder="Enter New Item Name"
														value={checklistItem}
														name="checklistItem"
														onChange={(e) => setChecklistItem(e.target.value)}
														onKeyDown={(e) => {
															if (e.key === 'Enter') {
																setChecklistItem(item.checklistItem)
																e.preventDefault();
																handleEditItemSubmit(e, item.id);
															}
														}}
														onBlur={() => setCurrEditItem(null)} // Disable editing mode when input field loses focus
														autoFocus // Focus on the input field when editing starts
													/>
													<p className="p-error">{errors?.checklistItem}</p>

												</label>
											) : (
												<span
													onDoubleClick={() => {
														setCurrEditItem(item.id)
														setEditChecklistItem(true)
													}} // Enable editing for this specific item
												>
													{item.checklistItem}
												</span>
											)}

										</label>

									</form>
								</div>
							</div>
						))}
						{!checklist?.length && !addChecklistItem && (
							<div onDoubleClick={handleAddAndSubmit}>Create a Checklist!</div>
						)}
						{addChecklistItem && (
							<div className="add-checklist">
								<form onSubmit={handleAddAndSubmit}>
									<label htmlFor="checklistItem">
										<input
											value={checklistItem}
											type="text"
											name="checklistItem"
											onChange={(e) => setChecklistItem(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													e.preventDefault();
													handleAddAndSubmit(e);
												}
											}}
											placeholder="Enter Checklist Item"
											onBlur={() => setAddChecklistItem(false)} // Disable editing mode when input field loses focus
											autoFocus // Focus on the input field when editing starts
										/>
										<p className="p-error">{errors?.checklistItem}</p>
									</label>
								</form>
							</div>
						)}
					</div>
					{checklist.length > 0 && (
						<div className="add-icon">
							<i onClick={handleDoubleClickAdd} className="fa-solid fa-plus" />
						</div>
					)}
				</div>
			</div>
		</>
	)
}



export default Checklist;
