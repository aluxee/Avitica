import { useModal } from '../../context/Modal';
// import { useState } from 'react';
// import Modal from 'react-modal';

function OpenModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	onModalClose // optional: callback function that will be called once the modal is closed
}) {

	const { setModalContent, setOnModalClose } = useModal();
	// const [modalIsOpen, setIsOpen] = useState(false);


	// function openModal() {
	// 	setIsOpen(true);
	// }
	// function closeModal() {
	// 	setIsOpen(false);
	// }
	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
		// openModal()
	};

	return (

		<>
			<button onClick={onClick}>{buttonText}</button>
			{/* <Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setIsOpen(false)} // Close modal on request
				backdrop={true}
				disableScroll={true}
				autoFocus={true}
			/> */}
		</>
	)
}



export default OpenModalButton;
