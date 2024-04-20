import { useSelector } from 'react-redux';
import LoginFormModal from '../../../LoginFormModal';
import OpenModalButton from '../../../OpenModalButton';
import './LandingPage.css';
import Swiper from '../Swiper';

function LandingPage() {
	const sessionUser = useSelector(state => state.session.user)

	console.log("%c 🚀 ~ file: LandingPage.jsx:12 ~ LandingPage ~ sessionUser: ", "color: yellow; font-size: 25px", sessionUser)


	return (
		<>
			<div className="welcome-outer">
				<div className="int welcome-inner" style={{ "fontSize": "32px" }}>

					<div className='landing-right'>
						<div className='landing-right-heading'>
							<div className='slimes'>
								<h3>slime</h3>
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

					<div className='landing-left'>
						<div className='landing-left-background'>
							<div className='landing-left-block'>
								<div className='landing-left-pic'>
									<h1>hello</h1>
									<h1>good bye</h1>
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
