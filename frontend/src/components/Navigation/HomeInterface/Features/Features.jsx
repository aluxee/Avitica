import './Features.css';
// import { NavLink } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { useSelector } from 'react-redux';
// import OpenModalMenuItem from '../../OpenModalMenuItem';
// import SignupFormModal from '../../../SignupFormModal';
function Features() {
	// const sessionUser = useSelector(state => state.session.user);

	// const navigate = useNavigate();

	// const redirectHome = () => {
	// 	navigate('/')
	// }

	return (
		<>
			<div className='features-outer'>
				<div className='features-inner'>
					<div className='title'>
						<h1>Features</h1>
					</div>
					<div className='thoughts'>
						<h2>Tasks</h2>
						<div>
							<h3>General Tasking</h3>
							Once a user logs in, they may find themselves basked in the glory of their listed tasks!
							This may be located by clicking on the home button, the logo, or &lsquo;To Dos&lsquo; located within the nav bar
						</div>
						<div>
							<h3>Task Details</h3>
							Create numerous tasks with details of title, notes, dueDate, and more!

							And if you don&#39;t have a dueDate, one will be automatically supplied with the current date for the user!
						</div>
						<div>
							<h3>What...There&#39;s more?!?!</h3>
							Build checklists to breakdown your tasks!
						</div>
						<div>
							Mark a task as complete or incomplete and watch the effects on your avatar and gameplay!
						</div>
					</div>
					<div className='thoughts'>
						<h2>Shop Feature</h2>
						<h3>Shop General</h3>
						<div>
							Earned enough gold? Add items to your cart in the shop page and bring them home into your inventory!
						</div>
					</div>
					<div className='thoughts'>
						<h2>Inventory</h2>
						<h3>Items</h3>
						<div>Utilize items like &lsquo;Red Potion&lsquo; to recover your health!</div>
					</div>
					<div>
						<h2>What are you Waiting for?</h2>
					</div>
				</div>
			</div>
		</>
	);
}

export default Features;
