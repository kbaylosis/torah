/**
 * checkApiKey
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how this policy works and how to use it, see:
 *   https://sailsjs.com/anatomy/api/policies/isLoggedIn.js
 */
module.exports = function (req, res, next) {
	if (sails.config.custom.apiKey[req.headers["x-app"]].indexOf(req.headers["x-api-key"]) === -1) {
		sails.log.error("Api Key:", req.headers["x-api-key"], "not allowed.");

		res.status(403);
		
		return res.send("Your are not permitted to perform this action.");
	}

	req.appKey = req.headers["x-api-key"];
	
	return next();
};
