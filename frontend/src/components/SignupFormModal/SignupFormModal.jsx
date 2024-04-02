import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';



function SignupFormModal() {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [heroClass, setHeroClass] = useState('Warrior' || 'Mage');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [auth, setAuth] = useState(true);
	const { closeModal } = useModal();



	useEffect(() => {

		if (!email || username.length < 6 || !displayName || !heroClass || password.length < 6 || !confirmedPassword) {
			setAuth(true)
		} else { setAuth(false) }

	}, [email, username.length, displayName, heroClass, password.length, confirmedPassword])

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});

		if (password === confirmedPassword) {

			const validation = {};
			return dispatch(sessionActions.signupUser({
				email,
				username,
				displayName,
				heroClass,
				password
			}))
				.then(closeModal)
				.catch(
					async (response) => {
						const data = await response.json()
						if (data && data?.errors) {
							validation.errors = data.errors;
							setErrors(data.errors);
						}
					})
		}
		return setErrors({
			confirmedPassword: "Confirm Password field must be the same as the Password field"
		})
	}

	return (
		<>
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
								Sign Up
							</button>
						</div>
					</form >
				</div>
			</div>
		</>
	);
}


export default SignupFormModal;
