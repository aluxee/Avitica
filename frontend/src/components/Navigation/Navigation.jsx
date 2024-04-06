import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import UserProfile from '../UserProfile/UserProfile';
// import WelcomePage from '../WelcomePage';
function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	sessionUser ? (
		<div className="yes-session-outer-container">
			<div className="yes-session-inner-container">
				<li className='nav-profile'>
					<ProfileButton user={sessionUser} />
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
				<footer>Hello</footer>
			</div>
		</>
	);

	return (
		<>
			<div className='nav-main-outer'>
				<div className='nav-main-inner'>
					<ul className='nav-main-list'>
						<li className='nav-home'>
							{
								sessionUser ?
									<>
										<div className='nav-left'>

											<NavLink to="/" className="yes-user-nav">To-Do&apos;s</NavLink>
											<NavLink to='/inv'>Inventory</NavLink>
											<NavLink to='/shop'>Shop</NavLink>
											<NavLink to='/battle'>Battle</NavLink>
										</div>
									</>
									:
									<>
										<NavLink to="/" className="no-user-nav">Home</NavLink>
									</>

							}
						</li>

						<li className='nav-avatar'>

						</li>
						{isLoaded && (
							<li className='nav_list' id='nav_profile'>
								<ProfileButton user={sessionUser} />
							</li>)}
					</ul>
					{sessionUser ?
						<>

							<ul className='nav-avatar-list'


							>
								<UserProfile user={sessionUser} />
							</ul>
						</> : <>
						</>
					}
				</div>
			</div>
			{/* <div className='welcome' style={{ height: "1000", position: "relative", top: "1rem" }}> */}
			{/* Welcome */}
			{/* <WelcomePage /> */}
			{/* </div> */}
		</>
	);
}


export default Navigation;
