import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import * as sessionActions from '../../store/session';
import CreateAvatar from '../Avatar/CreateAvatar';
import './SignupFormModal.css';
// import { thunkLoadAvatar } from '../../store/avatar';
// import { createAvatar } from '../../store/avatar';



function SignupFormModal({ onModalOpen, onModalClosed }) {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [heroClass, setHeroClass] = useState('Warrior' || 'Mage');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [auth, setAuth] = useState(true);
	const { closeModal } = useModal();
	const [showAvatarModal, setShowAvatarModal] = useState(false);

	// const [step, setStep] = useState(1);



	// make another modal
	useEffect(() => {
		// Disable flipbook interaction when modal is open
		onModalOpen()

		//clean up interaction to return flipbook interactivity when modal is closed
		return () => {
			onModalClosed()
		}
	}, [onModalClosed, onModalOpen]);

	useEffect(() => {
		const errorsObject = {}

		password !== confirmedPassword ? errorsObject.password = 'Passwords do not match, please try again' : password || confirmedPassword

		if (!email || username.length < 6 || !displayName || !heroClass || password.length < 6 || !confirmedPassword) {
			setAuth(true)
		} else { setAuth(false) }

		setErrors(errorsObject)
	}, [email, username.length, displayName, heroClass, password, confirmedPassword, showAvatarModal])


	useEffect(() => {
		const errorsObject = {};
		if (password !== confirmedPassword) {
			errorsObject.password = 'Passwords do not match';
		}
		if (username.length < 6) {
			errorsObject.username = 'Username must consist of more than 6 characters';
		} else if (username.length >= 20) {
			errorsObject.username = 'Username cannot exceed 20 characters';
		}
		if (displayName.length < 6) {
			errorsObject.displayName = 'Display name must consist of more than 6 characters';
		} else if (displayName.length >= 30) {
			errorsObject.displayName = 'Display name cannot exceed 30 characters';
		}
		if (!email.includes('@')) {
			errorsObject.email = 'Must be a valid email';
		}
		if (password.length < 6) {
			errorsObject.password = 'Password must consist of more than 6 characters';
		}
		setErrors(errorsObject);
		setAuth(Object.keys(errorsObject).length > 0);
	}, [email, username.length, displayName, heroClass, password, confirmedPassword]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmedPassword) {
			dispatch(sessionActions.signup({
				email,
				username,
				displayName,
				heroClass,
				password
			}))
				.then(() => {
					closeModal();
					setShowAvatarModal(true)
				})
				.catch(async (response) => {
					const data = await response.json();
					if (data && data?.errors) {
						setErrors(data.errors);
					}
				})
		} else {
			setErrors({
				confirmedPassword: "Confirm Password field must be the same as the Password field"
			});
		}
	}



	return (
		<>
			{
				!showAvatarModal ?

				<div className='outer-signup_container'>
					<div className='inner-signup_container'>
						<h1>Sign Up</h1>
						<form onSubmit={handleSubmit}>
							<div className='signup_container'>
								<label className='signup_username'>
									Username
									<input
										placeholder='username'
										type='text'
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</label>
								{errors.username && <p className='p-error'>{errors.username}</p>}

								<label className='signup_email'>
									Email
									<input
										placeholder='email'
										type='text'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</label>
								{errors.email && <p className='p-error'>{errors.email}</p>}

								<label className='signup_displayName'>
									Display Name
									<input
										placeholder='Enter your display name'
										type="text"
										value={displayName}
										onChange={(e) => setDisplayName(e.target.value)}
										required
									/>
								</label>
								{errors.displayName && <p className='p-error'>{errors.displayName}</p>}

								<label className='signup_heroClass'>
									Pick a Hero Class
									<select name="heroClass" id="heroClass" className="heroClass"
										value={heroClass}
										onChange={(e) => setHeroClass(e.target.value)}
									>
										<option value="Warrior">Warrior</option>
										<option value="Mage">Mage</option>
									</select>
								</label>
								{errors.heroClass && <p className='p-error'>{errors.heroClass}</p>}

								<label className='signup_password'>
									Password
									<input
										placeholder='password'
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</label>
								{errors.password && <p className='p-error'>{errors.password}</p>}

								<label className='signup_confirmedPassword'>
									Confirm Password
									<input
										placeholder='confirm password'
										type="password"
										value={confirmedPassword}
										onChange={(e) => setConfirmedPassword(e.target.value)}
										required
									/>
								</label>
								{errors.confirmedPassword && <p className='p-error'>{errors.confirmedPassword}</p>}
								<button
									type='submit'
									disabled={auth}
									className='signup-submit-button'
								>
									Sign Up (Next)
								</button>
							</div>
						</form >
					</div>
				</div>

			:
				// chooseAvatar === true &&
				<div className='outer-avatar'>
					<div className='inner-avatar'>
						{/* <OpenModalMenuItem
							className='avatar-creation-modal'
							itemText={"Create Avatar"}
							modalComponent={<CreateAvatar />}
						/> */}

							{/* // <CreateAvatar onSubmit={handleAvatarSubmit} /> */}
							<OpenModalMenuItem
								className='avatar-creation-modal'
								itemText={"Create Avatar"}
								modalComponent={<CreateAvatar />}
							/>

					</div>
				</div>
			}
		</>
	);




}


export default SignupFormModal;
