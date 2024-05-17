import './About.css';

function About() {

	return (
		<>

			<div className="about-outer">
				<div className="about-inner">
					<div className="title">
						<h1>About</h1>
					</div>
					<div className="thoughts">
						<h2>Design</h2>
						<div>
							A web application inspired by Habitica where users can organize their gameplay with a Maplestory feel to the website!
						</div>
					</div>
					<div className="thoughts">
						<h2>Creator</h2>
						<div>
							Made by
							<br />
							<a href='https://github.com/aluxee'>Github: @aluxee</a>
						</div>
					</div>
					<div className="thoughts">
					Turn the page to view more details in the Features section!
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
