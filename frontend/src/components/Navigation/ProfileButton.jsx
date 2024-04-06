import { useState, useEffect, useRef } from "react";
// import { useContext } from "react";
// // import { ButtonContext } from "../../context/ButtonContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';


// need for user? use context and use button context
function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const ulRef = useRef();
	const [showMenu, setShowMenu] = useState(false);
	const [hover, setHover] = useState("");
	// const { showMenu, setShowMenu, closeMenu, ulRef } = useContext(ButtonContext)


	const onHover = () => {
		setHover("profile")
	};

	const hovering = () => {
		setHover("");
	}

	const toggleMenu = (e) => {
		e.stopPropagation();// Keep click from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu)
	}
	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener("click", closeMenu);

	}, [showMenu])

	const closeMenu = () => {
		setShowMenu(false)
	}

	const logout = (e) => {
		e.preventDefault();

		dispatch(sessionActions.logout());
		navigate('/')
		alert("You have logged out.")
	}

	// const manageSpots = (e) => {
	// 	e.preventDefault();


	// 	navigate('/spots/current');
	// 	closeMenu();
	// }


	const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");
	const hoverClassName = "caption" + (hover === "profile" ? "" : "hidden");


	return (
		<>
			{<div className="outer-profile-container">
				<div className="inner-profile-container">
					<button
						onClick={toggleMenu}
						className="button-profile-dropdown"
					>

						< i className="fa-solid fa-user"
							onMouseOver={onHover}
							onMouseOut={hovering}
							role="button"

						/>
						{
							hover === "profile" &&
							<p className={hoverClassName + (showMenu ? (setHover("")) : "")}
							>Profile</p>
						}
					</button>
					<ul className={ulClassName} ref={ulRef}>
						{user ? (
							<>

								<li className="profile_dropdown_name">Hello, {user.displayName}! </li>
								<li className="profile_dropdown_username">{user.username}</li>
								<li className="profile_dropdown_email">{user.email}</li>
								<hr className="hr-profile" />
								<li className="profile_dropdown_logout">
									<button onClick={logout} className="user_logout_button">Log Out</button>
								</li>
							</>
						) : (
							<>
								<OpenModalMenuItem itemText="Log In"
									onItemClick={closeMenu}
									modalComponent={<LoginFormModal />}
								/>
								<hr style={{ height: "1%", color: "black", width: "100%" }} />
								<OpenModalMenuItem
									itemText="Sign Up"
									onItemClick={closeMenu}
									modalComponent={<SignupFormModal />}
								/>
							</>
						)}
					</ul>
				</div>
			</div >}
		</>

	);
}



export default ProfileButton;
