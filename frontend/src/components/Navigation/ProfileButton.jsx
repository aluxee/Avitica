import { useState, useEffect, useRef } from "react";
// import { useContext } from "react";
// // import { ButtonContext } from "../../context/ButtonContext";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useContext } from 'react';
import { LoggedContext } from '../../context/LoggedProvider';
import './ProfileButton.css';



function ProfileButton() {
	const { user, loggedIn, setLoggedIn } = useContext(LoggedContext)

	console.log("%c 🚀 ~ file: ProfileButton.jsx:17 ~ ProfileButton ~ loggedIn: ", "color: aqua; font-size: 25px", loggedIn)


	console.log("%c 🚀 ~ file: ProfileButton.jsx:17 ~ ProfileButton ~ setLoggedIn: ", "color: aqua; font-size: 25px", setLoggedIn)

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

	}, [showMenu, loggedIn])

	const closeMenu = () => {
		setShowMenu(false)
	}

	const logout = (e) => {
		e.preventDefault();

		dispatch(sessionActions.logout());
		alert("You have logged out.")
		navigate('/');
		setLoggedIn(false);
	}

	const ulClassName = "profile-dropdown" + (showMenu ? "" : "hidden");
	const hoverClassName = "caption" + (hover === "profile" ? "" : "hidden");


	return (
		<>
			{<div className="outer-profile-container">
				<NavLink to="/tasks" className="no-user-nav">
					<i
						style={{ color: "green" }}
						className="fa-solid fa-house" />
				</NavLink>
				<div className="inner-profile-container">
					<div className="profile-container">

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
					</div>

					{user ? (
						<ul className={ulClassName + 'login'} ref={ulRef}>
							<div className="only-login">

								<li className="profile_dropdown_name">Hello, {user.displayName}! </li>
								<li className="profile_dropdown_username">{user.username}</li>
								<li className="profile_dropdown_email">{user.email}</li>
								<hr className="hr-profile" />
								<li className="profile_dropdown_logout">
									<button onClick={logout} className="user_logout_button">Log Out</button>
								</li>

							</div>
						</ul>
					) : (
						<>
							<ul className={ulClassName} >
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
							</ul>
						</>
					)}
				</div>
			</div >}
		</>

	);
}



export default ProfileButton;
