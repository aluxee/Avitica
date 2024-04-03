import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import './Task.css';
import { thunkLoadCurrentTask } from '../../store/task';

function Task({ task, taskId }) {



	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);

	dispatch(thunkLoadCurrentTask(taskId))

	return (
		<>
			<div className='task-container'>
				{editing === false ?
					<>
						<div className='task-inner-container'>
							<div className='task-banner'>
								<h3>Edit: {task.title}</h3>
								
							</div>
							<div>

							</div>
						</div>
					</>
					:
					<>
						<div className='task-inner-container'>
							Hello
						</div>
					</>
				}

			</div>
		</>
	)
};




export default Task;
