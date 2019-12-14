const Joi = require('joi');
const config = require('./config');
const jwt = require('jsonwebtoken');
const Response = require('./responseManager');
const {HttpStatus, responseMessages} = require('./constants');

class Utility {

	/**
	 * decode Token
	 * @param {*} token
	 */
	static decodeToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(
				token,
				config.TokenSigning.secret,
				{
					algorithm: config.TokenSigning.algorithm,
				},
				(err, decoded) => {
					if (err) reject(err);
					resolve(decoded);
				}
			);
		});
	}


	static validateToken(req, res, next) {
		let token; let api_key;
		token = req && req.headers && req.headers['x-access-token']
			? req.headers['x-access-token'] : '';
		api_key = req && req.headers && req.headers['api-key']
			? req.headers['api-key'] : '';

		if (!token) return Response.failure(res, { message: 'No Token Provided' }, HttpStatus.BAD_REQUEST);
		if (!api_key || api_key !== config.api_key) return Response.failure(res, { message: 'Incorrect Api Key Provided' }, HttpStatus.BAD_REQUEST);


		return Utility.decodeToken(token)
			.then((decoded) => {
				if (!decoded)
					return Response.failure(res, { message: responseMessages.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);

				req.userId = decoded.userId;
				req.role= decoded.role;
				return next();
			})
			.catch((err) => {
				console.log(`decoding Error: ${err}`);
				return Response.failure(res, { message: responseMessages.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
			});
	}
}

module.exports = Utility;
