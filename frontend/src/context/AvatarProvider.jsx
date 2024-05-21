import { useState, useEffect, createContext, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { thunkLoadAvatar } from "../store/avatar";

export const AvatarContext = createContext();

export function AvatarProvider(props) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const avatar = useSelector(state => state.avatar);

	console.log("%c 🚀 ~ file: AvatarProvider.jsx:13 ~ AvatarProvider ~ avatar: ", "color: red; font-size: 25px", avatar)

	const avatarUrl = useSelector(state => state.avatar?.imageUrl);
	// const avatarState = useSelector(state => state.avatar);
	//TODO: test this state, confirm the user id of the state is equal to the user before proceeding with saving the avatar url

	// console.log("%c 🚀 ~ file: AvatarProvider.jsx:11 ~ AvatarProvider ~ avatarUrl: ", "color: red; font-size: 25px", avatarUrl)

	const [currAvatar, setCurrAvatar] = useState(localStorage.getItem('avatarUrl'));
	const [confirmAvatar, setConfirmAvatar] = useState(false);
	const urlRef = useRef(localStorage.getItem('avatarUrl'));

	useEffect(() => {
		dispatch(thunkLoadAvatar(avatar))
		if (avatarUrl) {
			setCurrAvatar(avatarUrl)
			localStorage.setItem('avatarUrl', avatarUrl);
			urlRef.current = avatarUrl;
		} else if (currAvatar) {
			setCurrAvatar(currAvatar)
			localStorage.setItem('avatarUrl', currAvatar);
			urlRef.current = currAvatar;
		}

	}, [currAvatar, avatarUrl, urlRef.current])

	const contextValue = {
		user: sessionUser,
		avatarUrl: currAvatar || avatarUrl,
		currAvatar, setCurrAvatar, confirmAvatar, setConfirmAvatar
	}

	// console.log("%c 🚀 ~ file: AvatarProvider.jsx:29 ~ AvatarProvider ~ contextValue: ", "color: red; font-size: 25px", contextValue)


	return (
		<AvatarContext.Provider value={contextValue}>
			{props.children}
		</AvatarContext.Provider>
	)
}
