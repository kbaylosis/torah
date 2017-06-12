/**
 * SwaggerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const SwaggerController = {
	doc(req, res) {
		res.status(200).json(sails.hooks.swagger.doc);
	},

	ui(req, res) {
		const docUrl = `${req.protocol}://${req.get("Host")}/swagger/doc`;

		res.redirect(`${sails.config.swagger.ui.url}?url=${encodeURIComponent(docUrl)}`);
	},
};

export default SwaggerController;
