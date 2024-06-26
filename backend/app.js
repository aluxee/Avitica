const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const avatarRouter = require('./routes/api/avatar.js');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
const routes = require('./routes');

// Load environment variables from .env file
require('dotenv').config();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
	// enable cors only in development
	app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin"
	})
);


const thirdPartyApiToken = process.env.MAPLESTORY_API_TOKEN;
const thirdPartyApiSecretKey = process.env.CLIENT_SECRET;
// Middleware to add MapleStory API token to request headers
app.use((req, _res, next) => {
	// Add MapleStory API token to headers
	req.thirdPartyHeaders = {
		'Authorization': `Bearer ${thirdPartyApiToken}`,
		'X-Secret-Key': thirdPartyApiSecretKey
	};
	next();
});


// // Set the _csrf token and create req.csrfToken method
// //also personally added token for third-party api
// app.use(
// 	csurf({
// 		cookie: {
// 			secure: isProduction,
// 			sameSite: isProduction && "Lax",
// 			httpOnly: true
// 		}
// 	})
// );
//! new adjustments:

// Define a router for CSRF-protected routes
const csrfProtectedRoutes = express.Router();
csrfProtectedRoutes.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true
		}
	})
);
csrfProtectedRoutes.use(routes);

// Define a router for non-CSRF-protected routes (e.g., avatar creation)
app.use('/api/avatar', avatarRouter);

// Apply the CSRF-protected routes
app.use(csrfProtectedRoutes);






app.use(routes); // Connect all the routes


// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = "Resource Not Found";
	err.errors = { message: "The requested resource couldn't be found." };
	err.status = 404;
	next(err);
});


const { ValidationError } = require('sequelize');

// Process sequelize errors
app.use((err, _req, _res, next) => {
	// check if error is a Sequelize error:
	if (err instanceof ValidationError) {
		let errors = {};
		for (let error of err.errors) {
			errors[error.path] = error.message;
		}
		err.title = 'Validation error';
		err.errors = errors;
	}
	next(err);
});


// Error formatter
app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	res.json({
		// title: err.title || 'Server Error',
		message: err.message,
		errors: err.errors,
		// stack: isProduction ? null : err.stack
	});
});

module.exports = app;
