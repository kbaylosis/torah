/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const UserController = {
	find : (req, res) => {
		setTimeout(() => {
			res.ok();
		}, 3000);
	},
};

export default UserController;
