import './WelcomePage.css';




function WelcomePage() {



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
						<div className='thoughts'>Dive in and organize your gameplay</div>
						{/* <div className='thought2'>Reminisce Nostalgia</div> */}
					</div>
				</div>
			</div>
		</>
	)
}

export default WelcomePage;
