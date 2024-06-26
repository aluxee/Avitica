const router = require('express').Router();
// const { User, Task } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const tasksRouter = require('./tasks.js');
const inventoryRouter = require('./inventory.js');
const userStatRouter = require('./userStats.js')
const shopRouter = require('./shop.js');
const avatarRouter = require('./avatar.js');

router.use(restoreUser);

// router.post('/test', function (req, res) {
// 	res.json({ requestBody: req.body });
// });


// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
	const user = await User.findOne({
		where: {
			username: 'Demo-lition'
		}
	});
	setTokenCookie(res, user);
	return res.json({ user: user });
});



// GET /api/restore-user


router.get(
	'/restore-user',
	(req, res) => {
		return res.json(req.user);
	}
);


// GET /api/require-auth
router.get(
	'/require-auth',
	requireAuth,
	(req, res) => {
		return res.json(req.user);
	}
);

// router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/tasks', tasksRouter);

router.use('/inv', inventoryRouter);

router.use('/info', userStatRouter);

router.use('/shop', shopRouter);

router.use('/avatar', avatarRouter);










router.post('/test', (req, res) => {
	res.json({ requestBody: req.body });
});




module.exports = router;
