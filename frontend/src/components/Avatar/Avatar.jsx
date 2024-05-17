import {
	useContext,
	// useState,
	// useEffect
} from 'react';
import CreateAvatar from './CreateAvatar';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import { useSelector } from 'react-redux';
// import { useModal } from '../../context/Modal';
import { AvatarContext } from '../../context/AvatarProvider';

import './Avatar.css';
import { LoggedContext } from '../../context/LoggedProvider';

function Avatar() {
	// const { closeModal } = useModal();
	const { avatarUrl, currAvatar } = useContext(AvatarContext);
	const { user } = useContext(LoggedContext)
	// const [currInv, setCurrInv] = useState([]);

	// useEffect(() => {
	// 	const storedInv = JSON.parse(localStorage.getItem('inventory'))

	// 	console.log("%c 🚀 ~ file: Avatar.jsx:20 ~ useEffect ~ storedInv: ", "color: red; font-size: 25px", storedInv)
	// 	if (storedInv) {
	// 		setCurrInv(storedInv)
	// 	} else {
	// 		setCurrInv([])
	// 	}
	// }, [currInv])

	// console.log("%c 🚀 ~ file: Avatar.jsx:22 ~ Avatar ~ currInv: ", "color: red; font-size: 25px", currInv)



	return (
		<>
			<div className='outer-avatar'>
				<div className='inner-avatar'>
					<div className='user-avatar'>
						{
							!avatarUrl ?
								<>
									<h1>You Have No Avatar Yet!</h1>
									<OpenModalButton
										className='avatar-creation-modal'
										buttonText={"Create Avatar"}
										modalComponent={<CreateAvatar />}
									/>
								</>
								:
								<div className='avatar-component'>
									<div className='avatar-exists'>
										<h1>You:</h1>
										<div className='avatar'>

											<img src={currAvatar} alt="user-avatar" className='theAvatar' />
											<OpenModalButton
												className='avatar-creation-modal'
												buttonText={"Edit Current Avatar"}
												modalComponent={<CreateAvatar />}
											/>
										</div>
									</div>
									<div className='stats'>
										<h2>Current Stats</h2>
										<div className='stat-details'>
											<div className='health'>
												<h3>Total Hp:</h3>
												<p>
													{user.Stats.hp}
												</p>
											</div>
											<div className='magic'>
												<h3>Magic:</h3>
												<p>
													{user.Stats.magic}
												</p>
											</div>
											<div className='str'>
												<h3>Strength:</h3>
												<p>
													{user.Stats.strength}
												</p>
											</div>
											<div className='mdef'>
												<h3>MDef:</h3>
												<p>
													{user.Stats.magicDefense}
												</p>
											</div>
											<div className='luck'>
												<h3>Luck:</h3>
												<p>
													{user.Stats.luck}
												</p>
											</div>
										</div>
									</div>
									<div className='currGear'>

									</div>
								</div>

						}

					</div>

					{/* <div className='user-other-stats'>
						{
							currInv ?
								currInv.map((item, index) => {
									<div key={index} className='avatar-inv'>
										<div className='gear'>
											{(item.gear && item.itemType === false) &&
												<div>
													<div>
														{item.Shop.itemIcon}
													</div>
													<div>
														{item.itemName}
													</div>
												</div>
											}
										</div>
									</div>
								})
								:
								<>
								</>
						}
					</div> */}

				</div>
			</div>
		</>
	)
}

export default Avatar;
