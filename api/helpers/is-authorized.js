import Request from "../lib/Request";

module.exports = {


	friendlyName: "Is authorized",


	description: "Check if user is authorized/logged in.",


	inputs: {
		accessToken : {
			type: "string",
			required: true,
		},

		appName: {
			type: "string",
			required: true,
		},

		apiKey: {
			type: "string",
			required: true,
		},
	},


	exits: {
		notAllowed: {
			description: "You are not permitted to perform this action.",
		},
	},


	fn: async (inputs, exits) => {
		try {
			let {accessToken} = inputs;

			if (accessToken && accessToken.indexOf("Bearer ") === 0) {
				accessToken = accessToken.replace("Bearer ", "");
			} else {
				return exits.notAllowed();
			}

			const request = new Request(
				sails.config.custom.authServer,
				inputs.appName,
				inputs.apiKey,
				accessToken
			);

			const query = JSON.stringify({
				accessToken,
			});

			const result = await request.get(`/sessions?where=${query}`);

			return exits.success(result);
		} catch (e) {
			sails.log.error(e);

			return exits.notAllowed(e);
		}

	},


};
