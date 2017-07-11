import Request from "../lib/Request";

const SMSService = {
	sendVerificationCode: async (req, mobileNumber, verificationCode) => {
		const request = new Request(
			sails.config.custom.smsServer,
			req.appName,
		);

		const messageBody = {
			mobileNumber,
			verificationCode,
		};

		return await request.post("/sms", messageBody);
	},

	sendSMSInvite: async (req, mobileNumber, senderName) => {
		const request = new Request(
			sails.config.custom.smsServer,
			"gomigu"
		);

		const messageBody = {
			mobileNumber,
			senderName,
		};

		return await request.post("/smsinvite", messageBody);
	},
};

export default SMSService;
