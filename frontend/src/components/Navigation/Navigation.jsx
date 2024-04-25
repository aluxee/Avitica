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
	const { user, loggedIn, setLoggedIn } = useContext(LoggedContext)



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
				<UserProfile user={user} />
			</div>
		</div>
	) : (
		<>
			<div className="no-session-outer-container">
				<div className="no-session-inner-container">
					<li>
						<OpenModalButton
							buttonText="Log In"
							modalComponent={<LoginFormModal />}
						/>
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
