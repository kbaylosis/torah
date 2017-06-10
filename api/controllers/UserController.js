/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	find : (req, res) => {
		setTimeout(() => {
			res.ok();
		}, 3000);
	},
};
