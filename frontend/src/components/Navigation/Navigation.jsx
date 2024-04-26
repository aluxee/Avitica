import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import UserProfile from '../UserProfile/UserProfile';
import { useContext } from 'react';
import { LoggedContext } from '../../context/LoggedProvider';
import './Navigation.css';

function Navigation({ isLoaded }) {

	const navigate = useNavigate();
	const { user } = useContext(LoggedContext);
	const [modalOpen, setModalOpen] = useState(false); // State to track if any modal is open


	// Function to handle modal open
	const handleModalOpen = () => {
		setModalOpen(true);
		// closeMenu(); // Close menu when modal opens
	};

	// Function to handle modal close
	const handleModalClose = () => {
		setModalOpen(false);
	};

	// Effect to disable flipbook interaction when modal is open
	// useEffect(() => {
	// 	const disableFlipBook = (e) => {
	// 		if (modalOpen) {
	// 			e.preventDefault();
	// 			e.stopPropagation();
	// 		}
	// 	};

	// 	// Add event listener to disable interaction when modal is open; questionable necessity
	// 	document.addEventListener('click', disableFlipBook);


	// 	// Clean up event listener
	// 	return () => {
	// 		document.removeEventListener('click', disableFlipBook);
	// 	};
	// }, [modalOpen]);

	const otherRedirect = async () => {

		await alert("Feature coming soon")
		navigate('/tasks')
	}


	user ? (
		<div className="yes-session-outer-container">
			<div className="yes-session-inner-container">
				<li className='nav-profile'>
					<ProfileButton />
				</li>
			</div>
			<div className='yes-session user-stats'>
				<UserProfile  />
			</div>
		</div>
	) : (
		<>
			<div className="no-session-outer-container">
				<div className="no-session-inner-container">
					<li>
						{/* <OpenModalButton
							buttonText="Log In"
							modalComponent={<LoginFormModal
								onModalOpen={handleModalOpen}
								onModalClosed={handleModalClose}
								navModalOpen={modalOpen}


							/>}
						/> */}
							<NavLink to="/login">Log In</NavLink>
					</li>
					<li>
						<NavLink to="/signup">Sign Up</NavLink>
					</li>
				</div>
				<div>

				</div>
				{/* <footer>github: @aluxee</footer> */}
			</div>
		</>
	);

	return (
		<>
			<div className='nav-main-outer'>
				<div className='nav-main-inner'>
					{user ?
						<>
							<ul className='nav-main-list'>
								<li className='nav-home'>
									<>
										<div className='nav-left'>
											<NavLink to='/tasks' className={"active"}>
												<section>

													<div className='sign'>

														<span className="fast-flicker" id='avitica'>A</span>vi<span className="flicker">t</span>ica
													</div>
												</section>
											</NavLink>
											<NavLink to="/tasks" className="yes-user-nav">To-Do&apos;s</NavLink>
											<NavLink to='/inv'>Inventory</NavLink>
											<NavLink to='/shop'>Shop</NavLink>
											<NavLink
												onClick={() => otherRedirect()}
											>Battle</NavLink>
										</div>
									</>

									{/* : */}
									{/* END OF NAV LEFT */}
									<>
										<NavLink to='/tasks'>
											<section>

												<div className='sign'>

													{/* <span className="fast-flicker" id='avitica'>A</span>vi<span className="flicker">t</span>ica
													 */}
													{/* Avitica */}
												</div>

											</section>
										</NavLink>
									</>
									{/* } */}
								</li>

								{isLoaded && (
									<li className='nav_list' id='nav_profile'>
										<ProfileButton user={user} />
									</li>)}
							</ul>
							<ul className='user-profile-nav'>
								<div className='nav-two'>
									<UserProfile user={user} />
								</div>
							</ul>
						</>
						:
						<div className='not-logged'>
							<NavLink to='/' className={"active"}>
								<section>

									<div className='sign'>

										<span className="fast-flicker" id='avitica'>A</span>vi<span className="flicker">t</span>ica
									</div>
								</section>
							</NavLink>
							{isLoaded && (
								<li className='nav_list' id='nav_profile'>
									<ProfileButton user={user} />
								</li>)}
						</div>
					}
				</div>
			</div>
		</>
	);
}


export default Navigation;
