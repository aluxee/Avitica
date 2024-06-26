import { useState, useEffect, useRef } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal({ onModalOpen, onModalClosed }) {

	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const modalRef = useRef(null);
	useEffect(() => {
		// Disable flipbook interaction when modal is open
		if (onModalOpen) {
			onModalOpen()
			//clean up interaction to return flipbook interactivity when modal is closed
			return () => {
				onModalClosed()
			}
		}

	}, [onModalClosed, onModalOpen, modalRef]);



	if (sessionUser) return <Navigate to="/tasks" replace={true} />;

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors({});
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data?.errors) setErrors(data.errors);
			}
		).then(closeModal)
	};


	const demoUser = (e) => {
		e.preventDefault();
		setErrors({})
		dispatch(sessionActions.login({ credential: 'Demolition', password: 'password' }))
			.then(closeModal())
			.catch(async response => {
				const data = await response.json();
				if (data && data.errors) {
					setErrors(data.errors)
				}
			})
	}


	return (
		<div className='login-modal'>

			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Username or Email
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.credential && <p>{errors.credential}</p>}
				<div className='login-buttons'>
					<button type="submit">Log In</button>
					<button className='demo' onClick={demoUser}>Log in as Demo User</button>

				</div>
			</form>
			{/* </Modal> */}
		</div>
	);
}

export default LoginFormModal;
