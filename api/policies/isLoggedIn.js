/**
 * isLoggedIn
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how this policy works and how to use it, see:
 *   https://sailsjs.com/anatomy/api/policies/isLoggedIn.js
 */
module.exports = function isLoggedIn(req, res, next) {

	return next();
	// if (req.headers["x-app"] === "gomigu-msg"){
	// 	req.appName = req.headers["x-app"];
	//
	// 	return next();
	// } else {
	// 	sails.helpers.isAuthorized({
	// 		accessToken: req.headers.authorization,
	// 		appName: req.headers["x-app"],
	// 	}).exec((err, session) => {
	// 		if (err) {
	// 			res.status(403);
	//
	// 			return res.send("Your are not permitted to perform this action.");
	// 		}
	//
	// 		req.userId = session.userId;
	// 		req.appName = session.appName;
	// 		req.token = session.accessToken;
	//
	// 		return next();
	// 	});
	// }

	// If `req.session.userId` is set, then we know that this request originated
	// from a logged-in user.  So we can safely proceed to the next policy--
	// or, if this is the last policy, the relevant action.
	// if (req.session.userId) {
	//   return next();
	// }

	// --•
	// Otherwise, this request did not come from a logged-in user.
	// return res.forbidden();

};
