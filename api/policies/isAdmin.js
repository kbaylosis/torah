/**
 * isLoggedIn
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how this policy works and how to use it, see:
 *   https://sailsjs.com/anatomy/api/policies/isLoggedIn.js
 */
module.exports = function isLoggedIn(req, res, next) {

	sails.helpers.isAuthorized({
		accessToken: req.headers.authorization,
		appName: req.headers["x-app"],
		apiKey: req.headers["x-api-key"],
	}).exec((err, session) => {
		if (err) {
			res.status(403);

			return res.send("Administrator access only.");
		} else if (session.length < 1) {
			res.status(403);

			return res.send("Administrator access only.");
		}

		session = JSON.parse(session);

		req.userId = session[0].userId.id;
		req.token = session[0].accessToken;
		req.userInfo = {
			userName: session[0].userId.userName,
			fullName: session[0].userId.fullName,
			firstName: session[0].userId.firstName,
			lastName: session[0].userId.lastName,
			email: session[0].userId.email,
			profilePhoto: session[0].userId.profilePhoto,
			coverPhoto: session[0].userId.coverPhoto,
			isAdmin: session[0].userId.isAdmin,
		};

		if (!req.userInfo.isAdmin) {
			res.status(403);

			return res.send("Administrator access only.");
		}

		return next();
	});
};
