import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import Home from '../Home/Home';

import './Navigation.css';
import UserProfile from '../UserProfile/UserProfile';
function Navigation({ isLoaded, setLoggedIn }) {
	const sessionUser = useSelector((state) => state.session.user);

	sessionUser ? (
		<div className="yes-session-outer-container">
			<div className="yes-session-inner-container">
				<li className='nav-profile'>
					<ProfileButton user={sessionUser} setLoggedIn={setLoggedIn} />
				</li>
			</div>
			<div className='yes-session user-stats'>
				<UserProfile user={sessionUser} />
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
					{sessionUser ?
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
											onClick={() => alert("Feature coming soon!")}
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
									<ProfileButton user={sessionUser} />
								</li>)}
						</ul>
						<ul>
								<div className='nav-two'>
										<UserProfile user={sessionUser} />
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
									<ProfileButton user={sessionUser} />
								</li>)}
						</div>
					}
				</div>
			</div>
		</>
	);
}


export default Navigation;
