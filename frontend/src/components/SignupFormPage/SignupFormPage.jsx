import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupFormPage.css';

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [heroClass, setHeroClass] = useState("Warrior" || "Mage");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to="/" replace={true} />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					displayName,
					heroClass,
					password
				})
			).catch(async (res) => {
				const data = await res.json();
				if (data?.errors) {
					setErrors(data.errors);
				}
			});
		}
		return setErrors({
			confirmPassword: "Confirm Password field must be the same as the Password field"
		});
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p className='p-errors'>{errors.email}</p>}
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errors.username && <p className='p-errors'>{errors.username}</p>}
				<label>
					Choose a nickname for your avatar!
					<input
						type="text"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						required
					/>
				</label>
				{errors.displayName && <p className='p-errors'>{errors.displayName}</p>}
				<label>
					Choose a Class:
					{/* <input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/> */}
					<select name="heroClass" id="heroClass" className='class'
						value={heroClass}
						onChange={(e) => setHeroClass(e.target.value)}
						required
					>
						<option value="Mage">Mage</option>
						<option value="Warrior">Warrior</option>
					</select>
				</label>
				{errors.heroClass && <p className='p-errors'>{errors.heroClass}</p>}
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <p className='p-errors'>{errors.password}</p>}
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors.confirmPassword && <p className='p-errors'>{errors.confirmPassword}</p>}
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormPage;
