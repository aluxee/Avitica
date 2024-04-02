import { useSelector } from 'react-redux';
import { mainImg, mainImg2 } from '../../images';
import './Home.css';
import Task from '../Task/Task';
function Home() {

	const user = useSelector(state => state.session.user)

	console.log("%c 🚀 ~ file: Home.jsx:9 ~ Home ~ user: ", "color: red; font-size: 25px", user)

	const switchUp = () => {
		if (!user) {
			const style = {
				backgroundImage: `url(${mainImg2})`, width: "100%", height: 1000, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
			}
			return style
		}
		else {
			const style = {
				backgroundImage: `url(${mainImg})`, width: "100%", height: 1000, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
			}
			return style
		}
	}
	return (
		<>
			<div className='home-hold'>
				{
					user ?
						<>
							<div className='task-section'>
								<Task user={user} />
							</div>
						</>
						:
						<div className='outer-home'
							style={switchUp.style}
						>
							<div className='inner-home'>
								<div></div>
								<div></div>
								<footer className='footer'>


								</footer>
							</div>
						</div>
				}
			</div>
		</>
	)

}




export default Home;
