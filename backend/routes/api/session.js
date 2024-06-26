const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, userStat, Stat } = require('../../db/models');

const router = express.Router();
const usersRouter = require('./users.js');

router.use('/users', usersRouter);



const validateLogin = [
	check('credential')
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage('Please provide a valid email or username.'),
	check('password')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a password.'),
	handleValidationErrors
];




// Log in
router.post(
	'/',
	validateLogin,
	async (req, res, next) => {
		const { credential, password } = req.body;

		const user = await User.unscoped().findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential
				}
			},
			include: [userStat, Stat]
		});



		if (!user || !bcrypt.compareSync(password, user.password.toString())) {
			const err = new Error('Login failed');
			err.status = 401;
			err.title = 'Login failed';
			err.errors = { credential: 'The provided credentials were invalid.' };
			return next(err);
		}

		// Checking if userInfo and statUser are arrays and contain elements
		const userStats = Array.isArray(user.userStats) && user.userStats.length > 0 ? user.userStats[0] : user.userStats;

		const Stats = Array.isArray(user.Stats) && user.Stats.length > 0 ? user.Stats[0] : user.Stats;

		// AVATAR SECTION






		// SUBMIT

		const safeUser = {
			id: user.id,
			username: user.username,
			displayName: user.displayName,
			email: user.email,
			heroClass: user.heroClass,
			userStats,
			Stats
		};

		await setTokenCookie(res, safeUser);

		return res.json({
			user: safeUser
		});
	}
);


// Log out
router.delete(
	'/',
	(_req, res) => {
		res.clearCookie('token');
		return res.json({ message: 'Success' });
	}
);




// Restore session user
router.get(
	'/',
	restoreUser,
	async (req, res) => {
		const { user } = req;

		if (user) {
			const userInfo = await userStat.findOne({ where: { userId: user.id } })
			const statUser = await Stat.findOne({ where: { userId: user.id } })


			// console.log("%c 🚀 ~ file: session.js:106 ~ userInfo: ", "color: red; font-size: 25px", userInfo)


			// console.log("%c 🚀 ~ file: session.js:110 ~ statUser: ", "color: red; font-size: 25px", statUser)


			// Checking if userInfo and statUser are arrays and contain elements
			user.userStats = Array.isArray(userInfo) && userInfo.length > 0 ? userInfo[0] : userInfo;
			user.Stats = Array.isArray(statUser) && statUser.length > 0 ? statUser[0] : statUser;

			// console.log("%c 🚀 ~ file: session.js:105 ~ user: ", "color: red; font-size: 25px", user)

			if (user) {
				const safeUser = {
					id: user.id,
					email: user.email,
					username: user.username,
					displayName: user.displayName,
					heroClass: user.heroClass,
					userStats: user.userStats,
					Stats: user.Stats
				};
				return res.json({
					user: safeUser
				});
			}

		} else return res.json({ user: null });
	}
);



module.exports = router;
