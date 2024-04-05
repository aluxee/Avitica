const responsePost = fetch('https://api.maplestory.net/character/render',
	{
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			"skin": "light",
			"faceId": 20000,
			"hairId": 30000,
			"pose": "walkingOneHanded",
			"poseFrame": 1,
			"faceEmote": "smile",
			"faceFrame": 0,
			"ears": "humanEars",
			"itemIds": [
				1060002,
				1040193
			],
			"effectFrame": 0
		})
	}
)
responsePost.then(response => (response.blob())).then(res => console.log(res)).catch(error => console.error('Error:', error));




const rep = fetch('https://api.maplestory.net/items', {
	headers: {
		"Content-Type": "application/json",

	},
	body: JSON.stringify(
		{
			"version": 220,
			"subversion": 3,
			"locale": 2
		}
	)
})
response.then(response => (response.json())).then(res => console.log(res))



const response = fetch('https://api.maplestory.net/items', {
	headers: {
		"Content-Type": "application/json",

	},
	body: JSON.stringify(
		{
			"version": 220,
			"subversion": 3,
			"locale": 2
		}
	)
})
response.then(response => (response.json())).then(res => console.log(res))

fetch('https://api.maplestory.net/item/2070006/iconRaw')
	.then(res => { return res.blob() })
	.then(blob => {
		let img = URL.createObjectURL(blob);
		console.log(img)
	})



//? querying
const reszo = fetch('https://api.maplestory.net/hairs', {
	headers: {
		"Content-Type": "application/json",
	},
	filters: {
		"nameText": "Cecelia"
	},
})
reszo.then(reszo => (reszo.json())).then(res => console.log(res.result.filter(
	(hair) => hair.name == "Cecelia")))

const reszi = fetch('https://api.maplestory.net/hairs?nameText=Cecelia', {
	headers: {
		"Content-Type": "application/json",
	},
})
reszi.then(reszi => (reszi.json())).then(res => console.log(res))
// Promise {
// 	<pending>}
// 		VM5297:6
//_______________________________________
// scrap with correct hover and caption capabilities
import { useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import './Task.css';
// import { thunkLoadCurrentTask } from '../../store/task';

function Task({ task, taskId }) {
	// const dispatch = useDispatch();
	// const tasks = useSelector(state => state.task);

	// console.log("%c 🚀 ~ file: AllTasks.jsx:17 ~ AllTasks ~ tasks: ", "color: red; font-size: 25px", tasks)

	// const [hover, setHover] = useState(null);
	// const [showMenu, setShowMenu] = useState([]);
	// const allTasks = Object.values(tasks);

	// console.log("%c 🚀 ~ file: AllTasks.jsx:23 ~ AllTasks ~ allTasks: ", "color: red; font-size: 25px", allTasks)


	// const ulRef = useRef(null);

	// const toggleMenu = (index) => {
	// 	const newShowMenu = [...showMenu];
	// 	newShowMenu[index] = !newShowMenu[index];
	// 	setShowMenu(newShowMenu);
	// };
	// const closeMenu = () => setShowMenu(false);


	// const onHover = (index) => {
	// 	setHover(index)
	// };

	// const hovering = () => {
	// 	setHover(null);
	// }

	// useEffect(() => {
	// 	dispatch(thunkLoadTasks())

	// }, [dispatch])


	// const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");
	// const hoverClassName = "menu-caption caption" + (hover !== null ? "" : "hidden");


	return (
		<>
			<div className='task-container'>
				<div className='at-menu'>

					{/* <button className={`menu-icon`}
						onClick={() => toggleMenu(index)}>


						<i className="fa-solid fa-ellipsis-vertical"
							onMouseOver={() => onHover(index)}
							onMouseOut={hovering}
							role='button'
						/>
						{
							hover === index && !showMenu[index] &&
							<p className={hoverClassName + (showMenu[index] ? " " : "hidden")}
							>Menu</p>
						}

					</button>
					<ul className={ulClassName + (showMenu[index] ? '' : 'hidden')}
						ref={ulRef} key={task.id}

					>

						<OpenModalMenuItem
							itemText={"View Task Details"}
							onItemClick={closeMenu}

							modalComponent={
								<EditTask
									task={task}
									taskId={task.id}
									key={task.id}
								/>}
						/> */}
					{/* [allow edit, delete, post on modal]
										[allow, edit, delete on menu button] */}

					{/* <OpenModalMenuItem
							itemText={"Delete this Task"}
							onItemClick={closeMenu}
							key={task.id}
						// modalComponent={<DeleteTask tasks={tasks} />}
						/> */}
					{/* </ul> */}

					{/* </div> */}

					{/* <h2 className='all-task-li'>
					{task.title}
				</h2>
				<div className='at-notes'>
					{task.notes ?
						<>
							<div className='all-task-yes-notes'>
								<div className='all-task-label'>
									Notes:
								</div>
								<div className='all-task-fill'>
									{task.notes}
								</div>
							</div>

						</>
						:
						<>
							<div className='all-task-no-notes'>
								[Create notes for your task!]</div>
						</>
					}
				</div>
				<div className='all-task-diff'>
					<div className='all-task-label'>
						Difficulty:
					</div>
					<div className='all-task-fill'>
						{task.difficulty}
					</div>
				</div> */}
					{/* <div className='all-task-checklist'>
									{
										task.Checklist ?
											<>
												<div className='all-task-yes-cl'>
													<div className='all-task-label'>
														Checklist:
													</div>
													<div className='all-task-fill at-cl-li'>

														<Checklist taskId={task.id} />
													</div>
												</div>
											</>
											:
											<>
												<div className='all-task-no-cl'>
													[Create a checklist here!]
												</div>
											</>
									}
								</div> */}
					{/* <div className='all-task-complete'>
					{
						task.completed ?
							<>
								<div className='all-task-label'>
									Completed [insert sign]:
								</div>
								<div className='all-task-fill'>
									[select yes option]
								</div>
							</>
							:
							<>
								<div className='all-task-label'>
									Not Completed [insert sign]:
								</div>
								<div className='all-task-fill'>
									[select no option]
								</div>
							</>
					}
				</div>
				<div className='at-due-date'>
					<div className='all-task-label'>
						Due Date:
					</div>
					<div className='all-task-fill'>
						{task.dueDate}
					</div> */}

				</div>
			</div>
		</>
	)
};




export default Task;
