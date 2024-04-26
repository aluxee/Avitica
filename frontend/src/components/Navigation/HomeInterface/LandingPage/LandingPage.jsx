import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoginFormModal from '../../../LoginFormModal';
import OpenModalButton from '../../../OpenModalButton';
import './LandingPage.css';
import OpenModalMenuItem from '../../OpenModalMenuItem';
import SignupFormModal from '../../../SignupFormModal';

function LandingPage({ toggleMenu, showMenu, setShowMenu, onModalOpen, onModalClosed }) {

	// console.log("%c 🚀 ~ file: LandingPage.jsx:11 ~ LandingPage ~ setAllowFlip: ", "color: red; font-size: 25px", setAllowFlip)

	const sessionUser = useSelector(state => state.session.user);

	console.log("%c 🚀 ~ file: LandingPage.jsx:12 ~ LandingPage ~ sessionUser: ", "color: yellow; font-size: 25px", sessionUser)

	// const [modalHovered, setModalHovered] = useState(false);
	const [modalOpen, setModalOpen] = useState(false); // State to track if any modal is open
	// TRYING TO ATTEMPT WHEN A USER HOVERS OUTSIDE OF MODAL, THE HTML FLIP BOOK SHOULD NOT ACTIVATE!


	// enter useEffect to make flipbook changes

	// // Effect to disable flipbook interaction when modal is open
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

	// Function to handle modal open
	const handleModalOpen = () => {
		setModalOpen(true);
		// closeMenu(); // Close menu when modal opens
	};


	const closeMenu = () => {
		setShowMenu(false)
		setModalOpen(false)
	}

	return (
		<>
			<div className='title'>
				<h1>Welcome to Avitica </h1>
			</div>
			<div className="welcome-outer">
				<div className="int welcome-inner" style={{ "fontSize": "32px" }}>

					<div className='landing-right'>
						<div className='landing-right-heading'>
							<div className='slimes'>
								<img src="https://i.pinimg.com/564x/16/65/46/1665466883e0be557276d5eb85015481.jpg" alt="slime" width={100} />
							</div>
							<div>
								<div className='escape'>
									Escape
								</div>
								<div>
									<span>into the future</span>
								</div>
							</div>
						</div>

						<div className='welcome-main'>
							{/* <div className='welcome-title'>Welcome to Avitica
							</div> */}
							<div className='thoughts'>Dive in and organize your gameplay
							</div>
							<div className='log-sign'>
								{

									// showMenu === true &&
									(
										<div className='login'>

											{!sessionUser && (
												<OpenModalButton
													buttonText="Log In"
													modalComponent={<LoginFormModal
														onModalOpen={onModalOpen}
														onButtonClick={handleModalOpen}
														onModalClosed={onModalClosed}
													/>}

												/>
											)}
										</div>
									)}
								<div className="signup">
									{!sessionUser && (
										<OpenModalMenuItem
											itemText="Sign Up"

											modalComponent={<SignupFormModal
												onModalOpen={onModalOpen}
												onItemClick={handleModalOpen}
												onModalClosed={onModalClosed}
											/>
											}
										/>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className='landing-left'>
						<div className='landing-left-background'>
							<div className='landing-left-block'>
								<div className='landing-left-pic'>
									<img src="https://i.pinimg.com/564x/cc/78/11/cc78118dd058b3a1363ecbe5fd9f373d.jpg" alt="maplestory-bck-clip" width={315} />
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</>
	)
}
export default LandingPage;
