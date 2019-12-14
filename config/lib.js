const Joi = require('joi');
const config = require('./config');
const jwt = require('jsonwebtoken');
const Response = require('./responseManager');
const {HttpStatus, responseMessages} = require('./constants');

class Utility {
	/**
	 * Generates Token to be sent back to client
	 * @param {*} data payload
	 */
	static generateToken(data) {
		const token = jwt.sign(
			data,
			config.TokenSigning.secret,
			{
				algorithm: config.TokenSigning.algorithm,
			}
		);
		return token;
	}

	static generateEmailToken(data){
		const token = jwt.sign(
			data,
			config.TokenSigning.email_token_secret,
			{
				algorithm: config.TokenSigning.algorithm,
			}
		)

		return token;
	}

	/**
	 * decdde Token
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

	static decodeEmailToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(
				token,
				config.TokenSigning.email_token_secret,
				{
					algorithm: config.TokenSigning.algorithm,
				},
				(err, decoded) => {
					if (err) return reject(err);
					return resolve(decoded);
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
				req.role= decoded.role
				return next();
			})
			.catch((err) => {
				console.log(`decoding Error: ${err}`);
				return Response.failure(res, { message: responseMessages.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
			});
	}

	static validateRole(role = config.roles.student){
		return function(req, res, next){
			if(typeof(role) === 'number'){
				if(role != req.role) return Response.failure(res, { message: responseMessages.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
				return next();
			}

			if(typeof(role) === 'object' && role.length >= 1){
				if(!role.includes(parseInt(req.role))) return Response.failure(res, { message: responseMessages.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
				return next()
			}

			return Response.failure(res, { message: responseMessages.UNAUTHORIZED }, HttpStatus.UNAUTHORIZED);
		}
	}

	static validateFileFormat(req, res, next){
		const {files} = req
		if(!files) return responseManager.failure(res, {message: responseMessages.NO_JSON_FILE_PROVIDED})
		let questions = files.questions
		if(!questions) return responseManager.failure(res, {message: responseMessages.NO_JSON_FILE_PROVIDED})
		let type = questions.type
		if(!type.includes('json')) return responseManager.failure(res, {message: responseMessages.FILE_SHOULD_BE_JSON})

		return next();
	}
}

module.exports = Utility;
