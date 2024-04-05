import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkLoadStats } from '../../store/stats';




function UserProfile({ user }) {

	console.log("%c 🚀 ~ file: UserProfile.jsx:11 ~ UserProfile ~ user: ", "color: red; font-size: 25px", user)

	const dispatch = useDispatch();
	const userInfo = useSelector(state => {
		console.log("STATE FOR USER: ", state)
	})

	console.log("%c 🚀 ~ file: UserProfile.jsx:15 ~ userInfo ~ userInfo: ", "color: magenta; font-size: 25px", userInfo)

	useEffect(() => {
		// fill out form
		// button to test look: generate avatar
		// finalize look: submit avatar
		dispatch(thunkLoadStats())
	})


	return (
		<>
			<div className="user-container">

				<div className="user-info">

					<div className="user-avatar">
						[insert image]
					</div>
					<div className="user-stats">
						<div className="user-lvl">

						</div>
						<div className="user-health">

						</div>
						<div className="user-exp">

						</div>
					</div>
				</div>
				<div className="currency">
					<div className="user-gold">

					</div>

				</div>
			</div>
		</>
	)
}




export default UserProfile;
