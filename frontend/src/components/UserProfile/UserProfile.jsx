import { useSelector } from 'react-redux';







function UserProfile() {

	const userInfo = useSelector(state => {
	
})
	// useEffect(() => {
	// 	// fill out form
	// 	// button to test look: generate avatar
	// 	// finalize look: submit avatar

	// })

	return (
		<>
			<div className="user-container">
				<div className="user-gold">

				</div>
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
			</div>
		</>
	)
}




export default UserProfile;
