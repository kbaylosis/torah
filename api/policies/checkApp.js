/**
 * checkApp
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how this policy works and how to use it, see:
 *   https://sailsjs.com/anatomy/api/policies/isLoggedIn.js
 */
module.exports = function (req, res, next) {
	// if (req.headers["x-app"] !== "gomigu-msg") {
	if (sails.config.custom.appList.indexOf(req.headers["x-app"]) === -1) {
		sails.log.error("App:", req.headers["x-app"], "not allowed.");

		res.status(403);

		return res.send("You are not permitted to perform this action.");
	}
	// } else {
	// 	sails.log.error("App:", req.headers["x-app"], "not allowed.");
	// 	res.status(403);
	// 	return res.send("You are not permitted to perform this action.");
	// }

	req.appName = req.headers["x-app"];

	return next();
};
