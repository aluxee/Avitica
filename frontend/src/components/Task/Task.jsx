import { thunkLoadTasks } from '../../store/task';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './Task.css';





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
					<ul className='all-task-ul'>
						{allTasks.length && allTasks.map(task => (
							// (console.log("TASK", task, task.title));
							<li key={task.id} className='all-task-li'>
								{task.title}
							</li>
						))}
					</ul>
				</div>
			</section >
		</>
	)

}


export default Task;
