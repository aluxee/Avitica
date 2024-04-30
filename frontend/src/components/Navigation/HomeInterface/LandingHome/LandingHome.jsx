import { useState, useEffect } from "react";
import LandingPage from "../LandingPage/LandingPage";
import About from "../About/About";
import Features from "../Features/Features";
import { useLocation, useNavigate } from 'react-router-dom';
import './LandingHome.css';
import HTMLFlipBook from 'react-pageflip';

function LandingHome() {
	const location = useLocation();
	const navigate = useNavigate();
	const [page, setPage] = useState(getPageIndex(location.pathname));
	const [showMenu, setShowMenu] = useState(false);
	const [modalOpen, setModalOpen] = useState(false); // State to track if any modal is open

	// Function to get the page index based on the current route
	function getPageIndex(pathname) {
		switch (pathname) {
			case '/':
				return 0;
			case '/about':
				return 1;
			case '/features':
				return 2;
			default:
				return 0;
		}
	}

	// Function to handle page navigation when next button is clicked
	function handleNext() {
		if (page === 0) {
			navigate('/about');
			setPage(1);
		} else if (page === 1) {
			navigate('/features');
			setPage(2);
		}
	}

	// Function to handle page navigation when previous button is clicked
	function handlePrev() {
		if (page === 1) {
			navigate('/');
			setPage(0);
		} else if (page === 2) {
			navigate('/about');
			setPage(1);
		}
	}


	// Function to handle modal open
	const handleModalOpen = () => {
		setModalOpen(true);
		closeMenu(); // Close menu when modal opens
	};

	// Function to handle modal close
	const handleModalClose = () => {
		setModalOpen(false);
	};

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
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

	return (
		<div className="home-outer">
			<div className="home-inner"
			>
				{
					modalOpen ? null : (

						<HTMLFlipBook width={800} height={800} minWidth={315} maxWidth={1150} minHeight={400} maxHeight={1200} showCover={true} currentPage={page}>

							<div className="demoPage">
								<LandingPage closeMenu={closeMenu} toggleMenu={toggleMenu} showMenu={showMenu} setShowMenu={setShowMenu}
									onModalOpen={handleModalOpen}
									onModalClosed={handleModalClose}
								/>
							</div>
							<div className="demoPage">
								<About />
							</div>
							<div className="demoPage">
								<Features />
							</div>
						</HTMLFlipBook>
					)
				}

				<div className="navigation-buttons">
					{/* <button onClick={handlePrev} disabled={page === 0}>Prev</button> */}
					{/* <button onClick={handleNext} disabled={page === 2}>Next</button> */}
				</div>
			</div>
		</div>
	);

}

export default LandingHome;
