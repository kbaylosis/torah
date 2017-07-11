import Request from "../lib/Request";

const request = new Request(
	sails.config.custom.fbProfileUrl
);

const FacebookService = {
	get: async (accessToken) => {
		let response = await request.get(accessToken, {});

		response = JSON.parse(response);

		sails.log.debug("FacebookService :: response");
		sails.log.debug(response);

		return response;
	},
};

export default FacebookService;
