/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const User = {

	attributes: {
		firstname : {
			type : "string",
			required : true,
			description : "User's first name",
		},
		lastname : {
			type : "string",
		},
	},

};

export default User;
