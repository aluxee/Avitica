

import OpenModalButton from '../OpenModalButton/OpenModalButton';

import './Avatar.css';
import CreateAvatar from './CreateAvatar';



function Avatar() {



	return (
		<>
			<div className='outer-avatar'>
				<div className='inner-avatar'>
					<div className='user-avatar'>
						<div className='for-testing'>
							<OpenModalButton
								className='avatar-creation-modal'
							buttonText={"Create Avatar"}
							modalComponent={<CreateAvatar />}
							/>

						</div>
					</div>

					<div className='user-other-stats'>

					</div>

				</div>
			</div>
		</>
	)
}

export default Avatar;
