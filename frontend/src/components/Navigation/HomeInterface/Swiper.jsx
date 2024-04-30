import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import './Swiper.css';


function Swiper() {
	const navigate = useNavigate();
	const [currPage, setCurrPage] = useState(0);

	const handlers = useSwipeable({
		onSwipedLeft: () => nextPage(),
		onSwipedRight: () => prevPage(),
	});

	const nextPage = () => {
		if (currPage < 2) {
			const nextPage = currPage + 1;
			setCurrPage(nextPage);
			navigateToPage(nextPage);
		}
	};

	const prevPage = () => {
		if (currPage > 0) {
			const prevPage = currPage - 1;
			setCurrPage(prevPage);
			navigateToPage(prevPage);
		}
	};
	// Disable the back button on the first page (index 0) and the next button on the last page (index 2)

	const navigateToPage = (page) => {
		if (page === 0) {
			navigate('/');
		} else if (page === 1) {
			navigate('/about');
		} else if (page === 2) {
			navigate('/features');
		}
	};
	// const isBackDisabled = currPage === 0;
	// const isNextDisabled = currPage === 2;

	return (
		<div {...handlers} className='swiper'>
			{/* Render the visual indicators and tooltips */}
			<div className="swiper-indicator left" onClick={prevPage} title="Click to go back">
				{/* Left arrow icon */}
				&#9664;
			</div>
			<div className="swiper-indicator right" onClick={nextPage} title="Click to turn page forward">
				{/* Right arrow icon */}
				&#9654;
			</div>

			{/* Render the next and back buttons */}
			{/* <button onClick={prevPage} disabled={isBackDisabled}>Back</button>
			<button onClick={nextPage} disabled={isNextDisabled}>Next</button> */}
		</div>
	);
}


export default Swiper;
