
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	const sessionLinks = sessionUser ? (
		<>
			<div className='session-outer-container'>
				<div className='session-inner-container'>


					<li>
						<ProfileButton user={sessionUser} />
					</li>
					<li>
						<button onClick={logout}>Log Out</button>
					</li>
				</div>
			</div>
		</>
	) : (
		<>
			<div className='so-outer-container'>
				<div className='so-inner-container'>
					<li>
						<NavLink to="/login">Log In</NavLink>
					</li>
					<li>
						<NavLink to="/signup">Sign Up</NavLink>
					</li>
				</div>
			</div >
		</>
	);

	return (
		<div className='outer-nav-container'>
			<div className='inner-nav-container'>
				<ul className='nav-ul'>
					<li className='nav-li'>
						<NavLink to="/">Home</NavLink>
					</li>
					{isLoaded && sessionLinks}
				</ul>
			</div>
		</div>

	);
}

export default Navigation;
