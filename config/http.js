/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

	/** **************************************************************************
	*                                                                           *
	* Sails/Express middleware to run for every HTTP request.                   *
	* (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
	*                                                                           *
	* https://sailsjs.com/documentation/concepts/middleware                     *
	*                                                                           *
	****************************************************************************/

	middleware: {

		/** *************************************************************************
		*                                                                          *
		* The order in which middleware should be run for HTTP requests.           *
		* (This Sails app's routes are handled by the "router" middleware below.)  *
		*                                                                          *
		***************************************************************************/

		order: [
			"cookieParser",
			"session",
			"bodyParser",
			"compress",
			"xframe",
			// "csp",
			"strictTransportSecurity",
			"referrerPolicy",
			"xssProtection",
			"contentOptions",
			"poweredBy",
			"apiVersion",
			"printRequest",
			"router",
			"www",
			"favicon",
		],

		/** *************************************************************************
		*                                                                          *
		* Custom middleware; logs each request to the console.                     *
		*                                                                          *
		***************************************************************************/

		// eslint-disable-next-line global-require
		xframe: require("lusca").xframe("SAMEORIGIN"),

		// csp: require("lusca").csp({
		// 	policy: {
		// 		"default-src": "https: 'self' 'unsafe-eval' 'unsafe-inline' wss:",
		// 		"img-src": "https: 'self' data:",
		// 	}
		// }),

		// eslint-disable-next-line global-require
		strictTransportSecurity: require("lusca").hsts({ maxAge: 31536000 }),

		referrerPolicy: (req, res, next) => {
			res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");

			next();
		},

		xssProtection: (req, res, next) => {
			res.setHeader("X-XSS-Protection", "1; mode=block");

			next();
		},

		contentOptions: (req, res, next) => {
			res.setHeader("X-Content-Type-Options", "nosniff");

			next();
		},

		poweredBy: (req, res, next) => {
			res.setHeader("X-Powered-By", "Zoog Technologies, Inc.");

			next();
		},

		apiVersion: (req, res, next) => {
			// eslint-disable-next-line global-require
			const p = require("../package.json");

			res.setHeader("X-Api", p.version);

			next();
		},

		printRequest: (req, res, next) => {
			sails.log.verbose(`${req.hostname} - ${req.method} - ${req.url}`);

			next();
		},


		/** *************************************************************************
		*                                                                          *
		* The body parser that will handle incoming multipart HTTP requests.       *
		*                                                                          *
		* https://sailsjs.com/config/http#?customizing-the-body-parser             *
		*                                                                          *
		***************************************************************************/

		// bodyParser: (function _configureBodyParser(){
		//   var skipper = require('skipper');
		//   var middlewareFn = skipper({ strict: true });
		//   return middlewareFn;
		// })(),

	},

};
