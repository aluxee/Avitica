import { useState, useEffect, useRef, createContext } from "react";
import { useSelector } from "react-redux";

export const LoggedContext = createContext();

export function LoggedProvider(props) {

	const sessionUser = useSelector(state => state.session.user)
	const [loggedIn, setLoggedIn] = useState(false);



	useEffect(() => {
		if (sessionUser) {
			setLoggedIn(true)
			console.log("%c 🚀 ~ file: LoggedProvider.jsx:11 ~ LoggedProvider ~ loggedIn: ", "color: aqua; font-size: 25px", loggedIn)
		} else {
			setLoggedIn(false)
			console.log("%c 🚀 ~ file: LoggedProvider.jsx:11 ~ LoggedProvider ~ loggedIn: ", "color: aqua; font-size: 25px", loggedIn)

		}
	}, [loggedIn, sessionUser])

	const contextValue = {
		user: sessionUser,
		loggedIn, setLoggedIn
	}

	console.log("%c 🚀 ~ file: LoggedProvider.jsx:29 ~ LoggedProvider ~ contextValue: ", "color: red; font-size: 25px", contextValue)


	return (
		<LoggedContext.Provider value={contextValue}>
			{props.children}
		</LoggedContext.Provider>
	)
}
