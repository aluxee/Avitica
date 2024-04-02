import { thunkLoadTasks } from '../../store/task';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './Task.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';





function Task() {
	const dispatch = useDispatch();
	const tasks = useSelector(state => state.task)

	// console.log("%c 🚀 ~ file: Task.jsx:15 ~ Task ~ tasks: ", "color: orange; font-size: 25px", tasks, tasks.title)
	const allTasks = Object.values(tasks)

	// console.log("%c 🚀 ~ file: Task.jsx:19 ~ Task ~ allTasks: ", "color: orange; font-size: 25px", allTasks)


	useEffect(() => {
		dispatch(thunkLoadTasks())

	}, [dispatch])

	return (
		<>
			<section className='outer-task-container'>
				<div className='inner-task-container'>
					<div className='avatar-nav'>
					[INSERT AVATAR STATS HERE]
					</div>
					<div className=''>
						[Make a modal to create a task here]
						<OpenModalMenuItem />
						[allow edit, delete, post on modal]
						[allow, edit, delete on menu button]
					</div>
					<ul className='all-task-ul'>
						{allTasks.length && allTasks.map(task => (
							// (console.log("TASK", task, task.title));
							<div key={task.id} className='at-tasks'>
								<h2 className='all-task-li'>
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
								</div>
								<div className='all-task-checklist'>
									{
										task.Checklist ?
											<>
												<div className='all-task-yes-cl'>
													<div className='all-task-label'>
														Checklist:
													</div>
													<div className='all-task-fill at-cl-li'>
														{task.Checklist.map(list => (
															list.checklistItem
														))}
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
								</div>
								<div className='all-task-complete'>
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
									</div>

								</div>
							</div>
						))}
					</ul>
				</div>
			</section >
		</>
	)

}


export default Task;
