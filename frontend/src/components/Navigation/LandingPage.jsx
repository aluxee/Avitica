import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import OpenModalButton from '../OpenModalButton';
import './LandingPage.css';




function LandingPage() {
	const sessionUser = useSelector(state => state.session.user)

	console.log("%c 🚀 ~ file: LandingPage.jsx:12 ~ LandingPage ~ sessionUser: ", "color: yellow; font-size: 25px", sessionUser)


	return (
		<>
			<div className="welcome-outer">
				<div className="int welcome-inner" style={{ "fontSize": "32px" }}>

					<div>
						<div className='escape'>
							Escape
						</div>
						<div>
							<span>into the future</span>
						</div>


					</div>
					<div className='welcome-main'>
						<div className='welcome-title'>Welcome to Avitica</div>
						<div className='thoughts'>Dive in and organize your gameplay
						</div>
						{!sessionUser && (
							<OpenModalButton
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default LandingPage;
