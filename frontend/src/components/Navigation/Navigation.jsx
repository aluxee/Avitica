import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	sessionUser ? (
		<div className="yes-session-outer-container">
			<div className="yes-session-inner-container">
				<li>
					<ProfileButton user={sessionUser} />
				</li>
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
			</div>
		</>
	);

	return (
		<div>
			<div>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					{isLoaded && (
						<li className='nav_list' id='nav_profile'>
							<ProfileButton user={sessionUser} />
						</li>)}
				</ul>
			</div>
		</div>
	);
}


export default Navigation;
