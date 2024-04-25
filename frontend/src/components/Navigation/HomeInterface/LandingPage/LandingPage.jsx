import { useSelector } from 'react-redux';
import LoginFormModal from '../../../LoginFormModal';
import OpenModalButton from '../../../OpenModalButton';
import './LandingPage.css';
import OpenModalMenuItem from '../../OpenModalMenuItem';
import SignupFormModal from '../../../SignupFormModal';

function LandingPage() {
	const sessionUser = useSelector(state => state.session.user)

	console.log("%c 🚀 ~ file: LandingPage.jsx:12 ~ LandingPage ~ sessionUser: ", "color: yellow; font-size: 25px", sessionUser)


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

								<div className='login'>

									{!sessionUser && (
										<OpenModalButton
											buttonText="Log In"
											modalComponent={<LoginFormModal />}
										/>
									)}
								</div>
								<div className="signup">
									{!sessionUser && (
										<OpenModalMenuItem
											itemText="Sign Up"
											modalComponent={<SignupFormModal />
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
