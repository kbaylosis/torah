import request from "request";

class Request {
	constructor(host, appName, apiKey, token) {
		this.host = host;
		this.appName = appName;
		this.apiKey = apiKey;
		this.token = token;
	}

	setToken = (token) => {
		this.token = token;
	}

	get = async (route) => this._request(route, "GET");

	post = (route, body) => this._request(route, "POST", body);

	patch = (route, body) => this._request(route, "PATCH", body);

	delete = (route) => this._request(route, "DELETE");

	static pipe = (url, req, res) => {
		if (!url) {
			return res.notFound();
		}

		req.pipe(request(url).on("error", (err) => {
			sails.log.error(err);
			res.notFound();
		})).pipe(res);
	}

	_request = async (route, method, body) =>
		new Promise((resolve, reject) => {
			const payload = {
				method,
				url : `${this.host}${route}`,
				headers : {
					Accept : "application/json",
					"Content-Type": "application/json",
				},
				json: body,
			};

			if (this.appName) {
				payload.headers["x-app"] = this.appName;
			}

			if (this.apiKey) {
				payload.headers["x-api-key"] = this.apiKey;
			}

			if (this.token) {
				payload.headers.Authorization = `Bearer ${this.token}`;
			}

			sails.log.debug(payload);
			request(payload, (err, response, body) => {
				if (err || response.statusCode !== 200) {
					sails.log.error(err);
					sails.log.error(response);

					return reject(err || response);
				}

				sails.log.debug("Request :: result");
				sails.log.debug(body);

				resolve(body);
			});
		});
}

export default Request;
